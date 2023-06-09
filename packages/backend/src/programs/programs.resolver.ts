import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Programs } from "./programs.type";
import { ProgramsService } from "./programs.service";

@Resolver(() => Programs)
export class ProgramsResolver {
  constructor(private readonly programService: ProgramsService) {}

  @Query(() => Programs)
  async findProgramById(
    @Args({
      name: "id",
      type: () => String,
    })
    id: string,
  ): Promise<Programs | undefined> {
    return this.programService.findById(id);
  }

  @Query(() => [Programs])
  async findProgramByName(
    @Args({
      name: "name",
      type: () => String,
    })
    name: string,
  ): Promise<Programs[]> {
    return this.programService.findByName(name);
  }

  @Query(() => [Programs])
  async findProgramsWithHighResidents(
    @Args({
      name: "min",
      type: () => Int,
    })
    min: number,
    @Args({
      name: "limit",
      type: () => Int,
    })
    limit: number,
  ): Promise<Programs[]> {
    return this.programService.findProgramsWithHighResidents(min, limit);
  }
}
