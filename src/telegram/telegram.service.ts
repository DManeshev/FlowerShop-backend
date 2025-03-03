import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Bot, InlineKeyboard } from "grammy";
import * as ejs from 'ejs'
import { join } from 'path'

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name)
  private bot: Bot

  private MESSAGE_FOR_USER_TEMPLATE_PATH = join(__dirname, "/../templates", "message-for-user.ejs");
  
  constructor() { 
    this.bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
    // this.configureBot()
  }

  // private configureBot() {
  //   this.bot.on('callback_query', async (ctx) => {
  //     console.log(ctx)
  //   })
  // }

  async sendNotification(orderId: number, messageTemplate: string) {
    const templateCopyMessageForUser = await ejs.renderFile(this.MESSAGE_FOR_USER_TEMPLATE_PATH)
  
    const inlineKeyboard = new InlineKeyboard()
      .copyText('📋 Сообщение для покупателя', templateCopyMessageForUser)
      .url('Перейти в карточку товара', `http://yourflowers21.ru/dashboard/productaction?productId=${orderId}`)

    try {
      await this.bot.api.sendMessage(process.env.CHAT_ID, messageTemplate, {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard,
      })
    } catch (error) {
      this.logger.error(error);
    }
  }

  // async onModuleInit() {
  //   try {
  //     this.logger.log('Запуск Telegram бота...');

  //     await this.bot.api.deleteWebhook({ drop_pending_updates: true });

  //     const botInfo = await this.bot.api.getMe();
  //     this.logger.log(`Информация о боте: ${JSON.stringify(botInfo)}`);

  //     await this.bot.start()
  //   } catch (error) {
  //     this.logger.error('Ошибка в onModuleInit:', error);
  //   }
  // }
}