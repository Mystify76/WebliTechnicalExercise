import { DynamicModule, Global, Module } from "@nestjs/common";
import { ApplicationModuleConfig } from "../app.interface";
import { ConfigurationService } from "./configuration.service";

@Global()
@Module({})
export class ConfigurationModule {
  static forRoot(config: ApplicationModuleConfig): DynamicModule {
    return {
      module: ConfigurationModule,
      providers: [
        {
          provide: ConfigurationService,
          useFactory: () => new ConfigurationService(config),
        },
      ],
      exports: [ConfigurationService],
    };
  }
}
