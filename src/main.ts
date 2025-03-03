import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { urlencoded, json } from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

  app.enableShutdownHooks()

	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ extended: true, limit: '50mb' }))
	app.setGlobalPrefix('api')
	app.enableCors({
		origin: [
			'http://localhost:3000',
			'http://83.220.168.220',
			'http://83.220.168.220:3000',
			'http://83.220.168.220:4200',
			'http://yourflowers21.ru'
		],
		credentials: true,
		exposedHeaders: 'set-cookie',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
	})

	await app.listen(4200)
}
bootstrap()
