module.exports = {
  extends: './.eslintrc.js',
  rules: {
    'n8n-nodes-base/node-param-default-wrong-for-multi-options': 'error',
    'n8n-nodes-base/node-param-default-wrong-for-simplify': 'error',
    'n8n-nodes-base/node-param-description-unneeded-backticks': 'error',
    'n8n-nodes-base/node-param-description-weak': 'error',
    'n8n-nodes-base/node-param-options-type-unsorted-items': 'error',
    'n8n-nodes-base/node-param-resource-with-plural-option': 'error',
  },
}; 