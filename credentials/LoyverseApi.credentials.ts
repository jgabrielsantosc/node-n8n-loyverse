import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LoyverseApi implements ICredentialType {
	name = 'loyverseApi';
	displayName = 'Loyverse API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			placeholder: 'your-api-key',
			required: true,
			typeOptions: {
				password: true,
			},
		},
	];
} 