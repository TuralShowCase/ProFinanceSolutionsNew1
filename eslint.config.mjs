import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Catch unused variables and imports
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // Disallow console.log in production code
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Enforce consistent use of === over ==
      "eqeqeq": ["error", "always"],
      // No empty catch blocks
      "no-empty": ["error", { allowEmptyCatch: false }],
    },
  },
];

export default config;
