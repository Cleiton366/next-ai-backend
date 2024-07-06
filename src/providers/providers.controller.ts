import { Controller, Post, Body, Patch, Param, Delete, Get, HttpException, Logger } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProviderEntity } from './entities/provider.entity';

@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) { }
  private readonly logger = new Logger(ProvidersController.name);

  @Get('preference/:preferencesId')
  @ApiOkResponse({ type: ProviderEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Preferences not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAllProvider(@Param('preferencesId') preferencesId: string) {
    try {
      return await this.providersService.getAllProvider(preferencesId);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Preferences not found') throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, { cause: new Error() });
    }
  }

  @Post()
  @ApiCreatedResponse({ type: ProviderEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  async create(@Body() createProviderDto: CreateProviderDto) {
    try {
      return await this.providersService.createProvider(createProviderDto);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Key cannot be empty'
        || error.message === 'Provider name cannot be empty'
        || error.message === 'Preferences ID cannot be empty'
      ) throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, { cause: new Error() });
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProviderEntity })
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  async update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    try {
      return await this.providersService.updateProvider(id, updateProviderDto);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Key cannot be empty') throw new HttpException(error.message, 400);
      if(error.message === 'Preferences ID cannot be empty') throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500, { cause: new Error() });
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Invalid Request' })
  async remove(@Param('id') id: string) {
    try {
      return await this.providersService.removeProvider(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'Provider not found') throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, { cause: new Error() });
    }
  }
}
