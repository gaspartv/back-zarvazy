import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { RestController } from "../../../common/rest/rest-controller";
import { SignInDto } from "./dtos/sign-in.dto";
import { AuthGuard } from "./management-auth.guard";
import { AuthService } from "./management-auth.service";

@RestController("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto, @Req() req: FastifyRequest) {
    return this.authService.signIn(signInDto.username, signInDto.password, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  check() {
    return { message: "ok" };
  }
}
