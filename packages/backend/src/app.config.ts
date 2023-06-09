import { ApolloDriver } from "@nestjs/apollo";
import { readFileSync } from "fs";
import { ApplicationModuleConfig } from "./app.interface";

const resolveConfigVar = (configVar: string, allowEmpty = false) => {
  if (process.env[`${configVar}_FILE`]) {
    return readFileSync(process.env[`${configVar}_FILE`] as string, "utf8");
  } else if (process.env[configVar] !== undefined) {
    return process.env[configVar];
  } else {
    if (allowEmpty) {
      return "";
    } else {
      throw new Error(`Missing configuration variable: ${configVar}`);
    }
  }
};

const appHostName = resolveConfigVar("APP_HOST_NAME");

if (!appHostName) throw new Error("App host name must be set");

export const applicationModuleConfig: ApplicationModuleConfig = {
  rawBody: true,
  host: appHostName,
  graphql: {
    autoSchemaFile: "src/schema.gql",
    driver: ApolloDriver,
    buildSchemaOptions: {
      noDuplicatedFields: true,
    },
    context: ({ req }) => ({ req }),
  },
};
