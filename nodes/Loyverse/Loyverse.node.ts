import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';

export class Loyverse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Loyverse',
		name: 'loyverse',
		icon: 'file:loyverse.svg',
		group: ['transform'],
		version: 1,
		description: 'Consume Loyverse API',
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Store',
						value: 'store',
					},
				],
				default: 'item',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'item',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get an item',
						routing: {
							request: {
								method: 'GET',
								url: '=/items/{{$parameter.itemId}}',
							},
						},
					},
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all items',
						routing: {
							request: {
								method: 'GET',
								url: '=/items',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Item ID',
				name: 'itemId',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'item',
						],
						operation: [
							'get',
						],
					},
				},
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData;

		try {
			const credentials = await this.getCredentials('loyverseApi') as ICredentialDataDecryptedObject;

			if (resource === 'item') {
				if (operation === 'get') {
					const itemId = this.getNodeParameter('itemId', 0) as string;
					responseData = await this.helpers.httpRequest({
						method: 'GET',
						url: `https://api.loyverse.com/api/v1.0/items/${itemId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
					});
				} else if (operation === 'getAll') {
					responseData = await this.helpers.httpRequest({
						method: 'GET',
						url: 'https://api.loyverse.com/api/v1.0/items',
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
					});
				}
			}

			if (Array.isArray(responseData)) {
				returnData.push(...responseData);
			} else {
				returnData.push(responseData);
			}
		} catch (error) {
			if (this.continueOnFail()) {
				const executionErrorData = {
					json: { error: error.message },
					itemIndex: 0,
				};
				returnData.push(executionErrorData);
			} else {
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
} 