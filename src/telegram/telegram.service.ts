import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Bot, InlineKeyboard } from "grammy";
import * as ejs from 'ejs'
import { join } from 'path'
import { OrderType } from "../order/order.types";
import { SocksProxyAgent } from 'socks-proxy-agent'
import https from 'node:https'

@Injectable()
export class TelegramService {
  private bot: Bot
  private readonly logger = new Logger(TelegramService.name)

  private NEW_ORDER_TEMPLATE_PATH = join(__dirname, "/../templates", "new-order-telegram.ejs");
  
  private proxyAgent = new SocksProxyAgent(
    `socks5h://${process.env.TELEGRAM_PROXY_USERNAME}:${process.env.TELEGRAM_PROXY_PASSWORD}@${process.env.TELEGRAM_PROXY_HOST}:${process.env.TELEGRAM_PROXY_PORT}`
  );

  constructor() {
    this.bot = new Bot(process.env.TELEGRAM_BOT_TOKEN, {
      client: {
        baseFetchConfig: {
          agent: this.proxyAgent,
        }
      }
    });
  }

  async sendNotification(order: OrderType) {
    try {
      const template: string = await this.createTemplateForSendNotification(order)

      const inlineKeyboard: InlineKeyboard = new InlineKeyboard();

      order.items.forEach(item => {
        inlineKeyboard.url('Перейти в карточку товара', `http://yourflowers21.ru/product/${item.product.slug}`)
      })

      await this.bot.api.sendMessage(process.env.CHAT_ID, template, {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard,
      })
    } catch (error) {
      this.logger.error(error);
      console.error('Telegram error:', error);
    }
  }

  async createTemplateForSendNotification(order: OrderType) {
    return await ejs.renderFile(this.NEW_ORDER_TEMPLATE_PATH, {
      id: order.id,
      name: order.name,
      phone: order.phone,
      deliveryType: order.deliveryMethod,
      address: `${order.city}, ${order.street}, ${order.houseNumber}, ${order.apartment}`,
      deliveryTime: order.deliveryTime,
      items: order.items,
      total: order.total,
    });
  }
}