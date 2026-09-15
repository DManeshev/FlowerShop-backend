import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FlowersController],
  providers: [FlowersService, PrismaService],
  imports: [AuthModule]
})
export class FlowersModule {}
