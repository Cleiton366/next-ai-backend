import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider.entity';

@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('preference/:preferencesId')
  @ApiOkResponse({ type: ProviderEntity, isArray: true })
  getAllProvider(@Param('preferencesId') preferencesId: string) {
    return this.providersService.getAllProvider(preferencesId);
  }

  @Post()
  @ApiCreatedResponse({ type: ProviderEntity })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.createProvider(createProviderDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProviderEntity })
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.providersService.removeProvider(id);
  }
}
