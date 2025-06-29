import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/generated/**", "src/components/magicui/*.tsx"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/hooks/**/*.ts", "src/hooks/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-spread": "error",
    },
  },
  {
    files: [
      "src/app/api/**/*.ts",
      "src/app/api/**/*.tsx",
      "src/app/lib/**/*.ts",
      "src/app/lib/**/*.tsx",
      "src/app/services/**/*.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
