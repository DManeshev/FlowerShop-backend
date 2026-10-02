import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service';
import { PaginationService } from '../pagination/pagination.service';
import { AuthModule } from '../auth/auth.module';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService, 
    PaginationService,
    FilesService,
  ],
  imports: [AuthModule]
})
export class ProductModule {}
