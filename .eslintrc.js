module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:n8n-nodes-base/nodes'
	],
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'n8n-nodes-base/node-param-default-wrong-for-multi-options': 'off',
		'n8n-nodes-base/node-param-default-wrong-for-simplify': 'off',
		'n8n-nodes-base/node-param-description-unneeded-backticks': 'off',
		'n8n-nodes-base/node-param-description-weak': 'off',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-resource-with-plural-option': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
}; 