import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LoyverseApi implements ICredentialType {
	name = 'loyverseApi';
	displayName = 'Loyverse API';
	documentationUrl = 'https://developer.loyverse.com/docs/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API Key for Loyverse API',
		},
	];
} 