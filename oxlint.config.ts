import { defineConfig } from "@fullstacksjs/oxlint-config";

export default defineConfig({
  rules: {
    "import/no-cycle": "off",
    "array-callback-return": "off",
    "react/exhaustive-deps": "off",
    "react/no-array-index-key": "off",
  },
});
