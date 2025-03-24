module.exports = {
  nodes: [
    {
      name: 'Loyverse',
      type: 'n8n-nodes-loyverse',
      version: '0.1.0',
      description: 'Interact with Loyverse API',
      defaultVersion: '0.1.0',
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
            },
            {
              name: 'Get Receipt',
              value: 'get',
              action: 'Get a receipt by number',
            },
            {
              name: 'Create Receipt',
              value: 'create',
              action: 'Create a new receipt',
            },
            {
              name: 'Refund Receipt',
              value: 'refund',
              action: 'Refund a receipt',
            },
          ],
          default: 'list',
        },
      ],
    },
  ],
}; 