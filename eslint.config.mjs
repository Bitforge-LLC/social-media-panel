import config from "@TheeCryptoChad/eslint";

export default [
  ...config,
  // Ignore generated and config files
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "postcss.config.mjs",
      "next.config.ts",
      "playwright.config.ts",
    ],
  },
  // App-specific rules
  {
    rules: {
      // Tailwind CSS
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-contradicting-classname": "error",
      // Folder/file naming conventions
      "check-file/folder-naming-convention": [
        "error",
        { "src/components/*/": "CAMEL_CASE" },
      ],
      "check-file/filename-naming-convention": [
        "error",
        { "src/components/**/*.{ts,tsx}": "CAMEL_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      // Restrict relative imports - use path aliases
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "../../*", "../../../*"],
              message: "Use path alias '@/*' instead of relative imports",
            },
          ],
        },
      ],
    },
  },
];
