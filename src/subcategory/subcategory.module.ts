import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, PrismaService],
  imports: [AuthModule]
})
export class SubcategoryModule {}
