import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import handlebars from "handlebars";
import { join } from "path";
import { AppModule } from "./app.module";
import { env } from "./config/env";
import { Log } from "./config/log";
import { PrismaClientExceptionFilter } from "./providers/prisma/prisma.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { rawBody: true },
  );

  app.enableCors({
    origin: "*",
  });

  app.useStaticAssets({ root: join(__dirname, "..", "..", "public") });
  app.setViewEngine({
    engine: { handlebars },
    templates: join(__dirname, "..", "..", "views"),
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [env.RABBITMQ_URL],
      queue: env.RABBITMQ_RECEIVED,
      noAck: false,
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();

  // Trata exceções do Prisma no nível do banco de dados
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(env.PORT, "0.0.0.0", () => {
    Log.info(env.PORT.toString(), "StartedPort");
  });
}
bootstrap();
