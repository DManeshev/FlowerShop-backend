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
import { getMailConfig } from './configs/mail.config'
import { TelegramModule } from './telegram/telegram.module'

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
    TelegramModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    })
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
