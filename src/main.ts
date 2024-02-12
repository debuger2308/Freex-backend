import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const cookieParser = require('cookie-parser')
async function start() {
  const PORT = process.env.PORT || 7000
  console.log(PORT);
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle("Freex docs")
    .setDescription("Freex documentation")
    .setVersion("0.1.5")
    .addTag("Freex")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.enableCors({
    credentials: true, origin: true,
  });
  await app.listen(PORT, () => console.log(`Server stared on port = ${PORT}`))
}

start()