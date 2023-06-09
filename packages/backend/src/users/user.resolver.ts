import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.type";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findResidentById(
    @Args({
      name: "id",
      type: () => String,
    })
    id: string,
  ): Promise<User | undefined> {
    return this.userService.findById(id);
  }

  @Query(() => [User])
  async findResidentByName(
    @Args({
      name: "name",
      type: () => String,
    })
    name: string,
  ): Promise<User[]> {
    return this.userService.findByName(name);
  }

  @Query(() => [User])
  async getAllResidents(): Promise<User[]> {
    return this.userService.getAllResidents();
  }
}
