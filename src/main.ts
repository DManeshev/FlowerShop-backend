import { NestFactory } from '@nestjs/core'
import { PrismaService } from './prisma.service'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
		res.header('Access-Control-Allow-Headers', 'Content-Type, Accept')
		next()
	})

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: true,
		// origin: ['http://localhost:3000', 'http://62.109.25.175:3000', 'http://62.109.25.175', 'http://yourflowers21.ru/'],
		credentials: true,
		exposedHeaders: 'set-cookie',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
	})

	await app.listen(4200)
}
bootstrap()
