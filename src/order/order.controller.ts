import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderDto } from './dto/order.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

  // getAll(@CurrentUser('id') userId: number) {
  @Get()
  @Auth()
  getAll() {
    return this.orderService.getAll()
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Post()
  // placeOrderWithoutPayment

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  placeOrder(@Body() dto: OrderDto) {
    return this.orderService.placeOrder(dto)
  }

  @HttpCode(200)
  @Post('status')
  updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto)
  }
}
