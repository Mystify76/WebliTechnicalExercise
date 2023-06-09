import { Field, ObjectType } from "@nestjs/graphql";
import { Programs } from "../programs/programs.type";
import { IsOptional } from "class-validator";

@ObjectType("User")
export class User {
  @Field(() => String)
  userId: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  gender?: string;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  moveInDate?: Date;

  @IsOptional()
  @Field(() => String, { nullable: true })
  levelOfCare?: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  hobbies?: string[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  roomNumber?: string;

  @IsOptional()
  @Field(() => [Programs], { nullable: true })
  recommendedPrograms?: Programs[];
}
