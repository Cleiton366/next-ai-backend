import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import MaskKey from './util/mask-key';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) { }

  async getAllProvider(preferencesId: string): Promise<Provider[]> {
    const providers = await this.prisma.provider.findMany({
      where: {
        preferencesId: preferencesId,
      }
    });

    var maskedProviders : Provider[] = [];
    providers.map(provider => {
      var maskedProvider = {
        id: provider.id,
        name: provider.name,
        key: MaskKey(provider.key),
        preferencesId: provider.preferencesId,
      }
      maskedProviders.push(maskedProvider);
    });

    return maskedProviders;
  }

  createProvider(data: CreateProviderDto): Promise<Provider> {
    return this.prisma.provider.create({
      data,
    });
  }

  updateProvider(id: string, data: UpdateProviderDto): Promise<Provider> {
    return this.prisma.provider.update({
      where: { id },
      data,
    });
  }

  removeProvider(id: string) {
    return this.prisma.provider.delete({
      where: { id },
    });
  }
}
