import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { TelegramService } from '../telegram/telegram.service'
import { AuthModule } from '../auth/auth.module'
import { ProductService } from '../product/product.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService, TelegramService],
	imports: [AuthModule]
})
export class OrderModule {}
