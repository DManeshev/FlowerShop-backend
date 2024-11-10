import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { EnumOrderStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from 'src/product/return-product.object'
import * as YooKassa from 'yookassa'
import { OrderDto } from './dto/order.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { MailerService } from '@nestjs-modules/mailer'
import { join } from 'path'

const yooKassa = new YooKassa({
	shopId: process.env['SHOP_ID'],
	secretKey: process.env['PAYMENT_TOKEN']
})

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		private mailerService: MailerService
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

	async createOrder(dto: OrderDto) {
		const total = dto.items.reduce((acc, item) => {
			return acc + item.price * item.quantity
		}, 0)

		//   {
		//     "name": "Букет из роз",
		//     "phone": "89999999999",
		//     "address": "Чебоксары, ул. Чапаева, д. 2",
		//     "flat": "58",
		//     "deliveryDate": "01.10.2024",
		//     "deliveryTime": "13:00",
		//     "items": []
		// }

		const order = await this.prisma.order.create({
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
          create: dto.items
        }
			}
		})

		// await this.sendMail()
	}

	async updateStatus(dto: PaymentStatusDto) {
		if (dto.event === 'payment.waiting_for_capture') {
			const payment = await yooKassa.capturePayment(dto.object.id)
			return payment
		}

		if (dto.event === 'payment.succeeded') {
			const orderId = Number(dto.object.description.split('№')[1])

			await this.prisma.order.update({
				where: {
					id: orderId
				},
				data: {
					status: EnumOrderStatus.PAYED
				}
			})

			return true
		}

		return true
	}

	async sendMail(order: OrderDto) {
		try {
			await this.mailerService.sendMail({
				to: 'yourflowers21@yandex.ru',
				subject: 'Новый заказ',
				template: join(__dirname, '/../templates', 'new-order'),
				context: {
					id: 1,
					name: 'qwerqwer',
					price: 500,
					phone: '123123',
					address: 'sdsafdsafsadf'
				}
			})
		} catch (error) {
			throw new HttpException(
				`Ошибка работы почты: ${JSON.stringify(error)}`,
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		}
	}
}
