import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("")
export class BaseController {
  @Get()
  findAll(@Req() request: Request): string {
    return "You have successfully connected to the David Gallant Welbi Technical Exercise Backend server.";
  }
}
