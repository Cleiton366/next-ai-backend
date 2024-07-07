import { Module } from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { ArchivesController } from './archives.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ArchivesController],
  providers: [ArchivesService, PrismaService],
})
export class ArchivesModule {}
