import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IN8nHttpResponse,
	INodeParameters,
	INodePropertyOptions,
	INodeProperties,
} from 'n8n-workflow';

interface IOperationData {
	request: {
		method: IHttpRequestMethods;
		url: string;
	};
}

interface IOperations {
	[key: string]: IOperationData;
}

interface INodeOption extends INodePropertyOptions {
	value: string;
	routing?: IOperations;
}

export class Loyverse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Loyverse',
		name: 'loyverse',
		icon: 'file:loyverse.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Loyverse API',
		defaults: {
			name: 'Loyverse',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'loyverseApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'List Receipts',
						value: 'list',
						action: 'List all receipts',
						routing: {
							request: {
								method: 'GET',
								url: '=/v1.0/receipts',
							},
						},
					},
					{
						name: 'Get Receipt',
						value: 'get',
						action: 'Get a receipt by number',
						routing: {
							request: {
								method: 'GET',
								url: '=/v1.0/receipts/{{$parameter.receipt_number}}',
							},
						},
					},
					{
						name: 'Create Receipt',
						value: 'create',
						action: 'Create a new receipt',
						routing: {
							request: {
								method: 'POST',
								url: '=/v1.0/receipts',
							},
						},
					},
					{
						name: 'Refund Receipt',
						value: 'refund',
						action: 'Refund a receipt',
						routing: {
							request: {
								method: 'POST',
								url: '=/v1.0/receipts/{{$parameter.receipt_number}}/refund',
							},
						},
					},
				],
				default: 'list',
			},
			{
				displayName: 'Receipt Number',
				name: 'receipt_number',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'refund'],
					},
				},
			},
			{
				displayName: 'Store ID',
				name: 'store_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Receipt Date',
				name: 'receipt_date',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Line Items',
				name: 'line_items',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'lineItemValues',
						displayName: 'Line Item',
						values: [
							{
								displayName: 'Variant ID',
								name: 'variant_id',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								default: 1,
							},
							{
								displayName: 'Price',
								name: 'price',
								type: 'number',
								default: 0,
							},
						],
					},
				],
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Payments',
				name: 'payments',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'paymentValues',
						displayName: 'Payment',
						values: [
							{
								displayName: 'Payment Type ID',
								name: 'payment_type_id',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Paid At',
								name: 'paid_at',
								type: 'dateTime',
								default: '',
							},
						],
					},
				],
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: 'n8n',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Created At Min',
				name: 'created_at_min',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						operation: ['list'],
					},
				},
			},
			{
				displayName: 'Created At Max',
				name: 'created_at_max',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						operation: ['list'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				displayOptions: {
					show: {
						operation: ['list'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const options: IHttpRequestOptions = {
					url: 'https://api.loyverse.com',
					headers: {
						Authorization: `Bearer ${await this.getCredentials('loyverseApi')}`,
					},
				};

				let responseData: IDataObject | IDataObject[] | undefined;
				
				// Obtém o nó atual
				const node = this.getNode();
				
				// Encontra a propriedade de operação nas propriedades do nó
				const operationProperty = (node as unknown as Loyverse).description.properties.find(
					(property: INodeProperties) => property.name === 'operation',
				) as INodeProperties & { options?: INodeOption[] };

				// Obtém os dados da operação selecionada
				const operationData = operationProperty?.options?.find(
					(option: INodeOption) => option.value === operation,
				)?.routing?.[operation];

				if (operationData) {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'loyverseApi',
						{
							...options,
							...operationData.request,
							url: options.url + operationData.request.url,
						},
					);

					if (response) {
						responseData = response as IDataObject | IDataObject[];
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map(item => ({ json: item as IDataObject })));
				} else if (responseData !== undefined) {
					returnData.push({ json: responseData as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
} 