import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node
        },
        plugins: { js },
        rules: js.configs.recommended.rules
    },

    {
        files: ['**/*.{ts,mts,cts}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module'
            },
            globals: globals.node
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    }
]);
