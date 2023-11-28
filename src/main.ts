import { NestFactory } from '@nestjs/core'
import { PrismaService } from './prisma.service'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api')
	app.enableCors()

	await app.listen(4200)
}
bootstrap()
