import json from "@eslint/json";

export default [
    {
        plugins: {
            json,
        },
    },
    {
        files: ["**/*.json"],
        language: "json/json",
        rules: {
            "json/no-duplicate-keys": "error",
        },
    },
];
