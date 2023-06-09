import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { ApplicationModuleConfig } from "./app.interface";
import { BaseController } from "./baseRoute/base";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DataModule } from "./data/data.module";
import { DataService } from "./data/data.service";
import { UserService } from "./users/user.service";
import { UsersModule } from "./users/users.module";
import { ProgramsService } from "./programs/programs.service";
import { ProgramsModule } from "./programs/programs.module";

const providers: Provider[] = [DataService, UserService, ProgramsService];

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: ".",
    }),
    ConfigurationModule,
    DataModule,
    UsersModule,
    ProgramsModule,
  ],
  providers: [...providers],
  exports: [...providers],
  controllers: [BaseController],
})
export class ApplicationModule {
  static forRoot(config: ApplicationModuleConfig): DynamicModule {
    const { graphql } = config;

    return {
      module: ApplicationModule,
      imports: [GraphQLModule.forRoot(graphql), ConfigurationModule.forRoot(config)],
    };
  }

  constructor() {
    /* noop */
  }
}
