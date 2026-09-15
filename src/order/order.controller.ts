import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { OrderDto } from './dto/order.dto'
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

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  createOrder(@Body() dto: OrderDto) {
    return this.orderService.createOrder(dto)
  }
}
