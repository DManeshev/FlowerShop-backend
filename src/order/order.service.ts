import { Injectable } from '@nestjs/common'
import { EnumOrderStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from 'src/product/return-product.object'
import * as YooKassa from 'yookassa'
import { OrderDto } from './dto/order.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'

const yooKassa = new YooKassa({
    shopId: process.env['SHOP_ID'],
    secretKey: process.env['PAYMENT_TOKEN']
})

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

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

	async placeOrder(dto: OrderDto) {
        const total = dto.items.reduce((acc, item) => {
            return acc + item.price * item.quantity
        }, 0);

		const order = await this.prisma.order.create({
			data: {
                name: dto.name,
                phone: dto.phone,
                commentary: dto.commentary,
                address: dto.address,
                flat: dto.flat,
                hallway: dto.hallway,
                deliveryDate: dto.deliveryDate,
                deliveryTime: dto.deliveryTime,
				status: dto.status,
                total,
				items: {
					create: dto.items
				},
			}
		})

		const payment = await yooKassa.createPayment({
            amount: {
                value: total.toFixed(2),
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'redirect',
                return_url: 'http://localhost:3000/thanks'
            },
            description: `Заказ №${order.id}`
        })
        
        return payment
	}

	async updateStatus(dto: PaymentStatusDto) {
        if (dto.event === 'payment.waiting_for_capture') {
            const payment = await yooKassa.capturePayment(dto.object.id);
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
}
