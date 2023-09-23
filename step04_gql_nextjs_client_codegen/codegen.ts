import { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: "https://main--spacex-l4uc6p.apollographos.net/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/lib/gql/": {
      preset: "client",
    },
  },
};
export default config;
