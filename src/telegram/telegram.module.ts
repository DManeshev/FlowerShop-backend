import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService, PrismaService]
})
export class TelegramModule {}