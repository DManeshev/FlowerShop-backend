import { Injectable } from '@nestjs/common'
import { OrderDto } from './dto/order.dto'
import { TelegramService } from '../telegram/telegram.service'
import { PrismaService } from '../prisma.service';
import { returnProductObject } from '../product/return-product.object';
import { Order } from '@prisma/client';
import { orderForTelegram } from './return-order.object';
import { OrderType } from './order.types';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  async getAll() {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: {
              select: returnProductObject
            }
          }
        }
      }
    })
  }

  async findUniqueOrder(orderId: number) {
    return await this.prisma.order.findUnique({
      where: { id: orderId },
      include: orderForTelegram,
    })
  }

  async createOrder(dto: OrderDto) {
    const total: number = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    const createdOrder: Order = await this.prisma.order.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        commentary: dto.commentary,
        deliveryDate: dto.deliveryDate,
        deliveryTime: dto.deliveryTime,
        status: dto.status,
        city: dto.city,
        street: dto.street,
        houseNumber: dto.houseNumber,
        apartment: dto.apartment,
        total,
        items: {
          create: dto.items,
        }
      }
    });

    const order: OrderType = await this.findUniqueOrder(createdOrder.id);

    this.telegramService.sendNotification(order)
  }

  async updateStatus(dto) {
    // if (dto.event === 'payment.waiting_for_capture') {
    // 	const payment = await yooKassa.capturePayment(dto.object.id)
    // 	return payment
    // }

    // if (dto.event === 'payment.succeeded') {
    // 	const orderId = Number(dto.object.description.split('№')[1])

    // 	await this.prisma.order.update({
    // 		where: {
    // 			id: orderId
    // 		},
    // 		data: {
    // 			status: EnumOrderStatus.PAYED
    // 		}
    // 	})

    // 	return true
    // }

    // return true
  }
}
