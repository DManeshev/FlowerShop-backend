import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, PrismaService],
  imports: [AuthModule]
})
export class FilesModule {}
