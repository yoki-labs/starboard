module.exports = {
	parserOptions: {
		project: "./tsconfig.json"
	},
	extends: "@sapphire",
	ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/types/**", "**/scripts/**", "*.d.ts"],
	rules: {
		"@typescript-eslint/no-base-to-string": "off",
		"@typescript-eslint/explicit-member-accessibility": "off"
	}
};
