import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // debug: true,
  // verbose: true,
  schema: ["../backend/src/schema.gql"],
  documents: ["./**/*.tsx", "./**/*.ts"],
  config: { namingConvention: "keep" },
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {},
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
