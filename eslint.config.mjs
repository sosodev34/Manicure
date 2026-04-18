import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const ignoredPrototypeFiles = [
  ".next/**",
  "node_modules/**",
  "src/main.tsx",
  "vite.config.ts",
  "src/app/App.tsx",
  "src/app/components/Navigation.tsx",
  "src/app/components/BookingFlow.tsx",
  "src/app/components/AccountDashboard.tsx",
  "src/app/components/ui/**",
  "src/app/components/figma/**"
];

const eslintConfig = [
  {
    ignores: [
      ...ignoredPrototypeFiles
    ]
  },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "@next/next/no-img-element": "off"
    }
  }
];

export default eslintConfig;
