import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service';
import { PaginationService } from '../pagination/pagination.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService],
  imports: [AuthModule]
})
export class ProductModule {}
