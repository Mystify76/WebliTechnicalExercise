import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@ObjectType("Program")
export class Programs {
  @Field(() => String, { nullable: true })
  id?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  mode?: string;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  start?: Date;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  end?: Date;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  dimensions?: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  facilitators?: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  hobbies?: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  levelsOfCare?: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  attendees?: string[];
}
