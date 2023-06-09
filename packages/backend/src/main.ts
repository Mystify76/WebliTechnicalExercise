import "./helpers/JSONWithDate";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { applicationModuleConfig } from "./app.config";
import { ApplicationModule } from "./app.module";

Logger.log(`David Gallant - Welbi Technical Exercise Backend server is starting up within the ${process.env.APP_ENVIRONMENT} environment...`);

async function bootstrap() {
  try {
    const app = await NestFactory.create(ApplicationModule.forRoot(applicationModuleConfig), { bodyParser: true });

    if (!process.env.APP_PORT) throw new Error("App port must be set");

    app.enableCors();

    const port = parseInt(process.env.APP_PORT, 10);
    await app.listen(port);
  } catch (err: any) {
    Logger.error(`David Gallant - Welbi Technical Exercise Backend server failed to start up due to an error: ${err.message}`);
  }
}

bootstrap()
  .then(() => {
    Logger.log(`\n\n****\tDavid Gallant - Welbi Technical Exercise Backend server is now running on port ${process.env.APP_HOST_PORT} within the ${process.env.APP_ENVIRONMENT} environment`);
  })
  .catch(err => {
    Logger.error(`\n\n****\tDavid Gallant - Welbi Technical Exercise Backend failed to start due to the following error: ${err.message}`);
  });
