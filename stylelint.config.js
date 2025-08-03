/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // Disable rules that conflict with TailwindCSS
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen", "theme", "layer"],
      },
    ],
    "no-descending-specificity": null,
    // Allow custom properties (CSS variables)
    "custom-property-pattern": null,
    // Allow empty lines
    "comment-empty-line-before": null,
    // TailwindCSS @apply rule
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme"],
      },
    ],
    // Allow TailwindCSS import notation
    "import-notation": null,
  },
};
