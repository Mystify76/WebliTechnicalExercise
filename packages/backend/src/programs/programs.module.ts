import { Module, Provider } from "@nestjs/common";
import { ProgramsResolver } from "./programs.resolver";
import { ProgramsService } from "./programs.service";

const providers: Provider[] = [ProgramsService, ProgramsResolver];

@Module({
  imports: [],
  providers,
  exports: providers,
})
export class ProgramsModule {}
