import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChatEntity } from 'src/chats/entities/chat.entity';

@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiCreatedResponse({ type: ChatEntity })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.createProvider(createProviderDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ChatEntity })
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.providersService.removeProvider(id);
  }
}
