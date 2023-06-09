import { Module, Provider } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

const providers: Provider[] = [UserService, UserResolver];

@Module({
  imports: [],
  providers,
  exports: providers,
})
export class UsersModule {}
