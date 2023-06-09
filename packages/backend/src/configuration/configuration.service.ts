import { Injectable } from "@nestjs/common";
import { ApplicationModuleConfig } from "../app.interface";

@Injectable()
export class ConfigurationService {
  constructor(private readonly config: ApplicationModuleConfig) {}

  getHost() {
    return this.config.host;
  }
}
