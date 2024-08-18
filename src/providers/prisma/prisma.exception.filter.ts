import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FastifyReply } from "fastify";

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(statusCode).send({
      statusCode,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
