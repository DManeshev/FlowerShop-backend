import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { OrderModule } from './order/order.module'
import { PaginationModule } from './pagination/pagination.module'
import { PrismaService } from './prisma.service'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'
import { FlowersModule } from './flowers/flowers.module'
import { FilesModule } from './files/files.module'
import { CategoryModule } from './category/category.module'
import { SubcategoryModule } from './subcategory/subcategory.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ProductModule,
		OrderModule,
		PaginationModule,
		FlowersModule,
		FilesModule,
		CategoryModule,
		SubcategoryModule,
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: () => ({
				transport: 'smtps://flowershop21@mail.ru:dfdePTDrtCN6NFYmMGWx@smtp.mail.ru',
				defaults: {
					from: 'Новый заказ'
				},
				template: {
					adapter: new EjsAdapter(),
					options: {
						strict: false,
					},
				},
			}),
			inject: [ConfigService]
		}),
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
