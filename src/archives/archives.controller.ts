import { Controller, Get, Param, Logger, HttpException, Patch } from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChatEntity } from 'src/chats/entities/chat.entity';
import { Chat } from '@prisma/client';

@ApiTags('Archives')
@Controller('archives')
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}
  private readonly logger = new Logger(ArchivesController.name);
  
  @Get('/user/:userId')
  @ApiOkResponse({ type: ChatEntity, isArray: true })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getArchivedChats(@Param('userId') userId: string): Promise<Chat[]> {
    try {
      return await this.archivesService.getArchivedChats(userId);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }
  
  @Patch('/archive-all/:userId')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async archiveAllChats(@Param('userId') userId: string): Promise<void> {
    try {
      await this.archivesService.archiveAllChats(userId);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Patch('archive/:id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  async archiveChat(@Param('id') id: string): Promise<void> {
    try {
      return await this.archivesService.archiveChat(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat Id cannot be empty')
        throw new HttpException(error.message, 400);
      if (error.message === 'Chat not found')
        throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }

  @Patch('unarchive/:id')
  @ApiOkResponse({ type: ChatEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async unarchiveChat(@Param('id') id: string): Promise<void> {
    try {
      await this.archivesService.unarchiveChat(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Chat Id cannot be empty')
        throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, {
        cause: new Error(),
      });
    }
  }
}
