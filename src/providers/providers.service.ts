import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import MaskKey from './util/mask-key';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  async getAllProvider(preferencesId: string): Promise<Provider[]> {
    const preferences = await this.prisma.preferences.findUnique({
      where: {
        id: preferencesId,
      },
    });

    if (!preferences) throw new Error('Preferences not found');

    const providers = await this.prisma.provider.findMany({
      where: {
        preferencesId: preferencesId,
      },
    });

    if (!providers) return [];

    const maskedProviders: Provider[] = [];
    providers.map((provider) => {
      const maskedProvider = {
        id: provider.id,
        name: provider.name,
        key: MaskKey(provider.key),
        preferencesId: provider.preferencesId,
      };
      maskedProviders.push(maskedProvider);
    });

    return maskedProviders;
  }

  async createProvider(data: CreateProviderDto): Promise<Provider> {
    if (!data.key) throw new Error('Key cannot be empty');
    if (!data.name) throw new Error('Provider name cannot be empty');
    if (!data.preferencesId) throw new Error('Preferences ID cannot be empty');

    return await this.prisma.provider.create({
      data,
    });
  }

  async updateProvider(id: string, data: UpdateProviderDto): Promise<Provider> {
    if (!data.key) throw new Error('Key cannot be empty');
    if (!data.preferencesId) throw new Error('Preferences ID cannot be empty');

    return await this.prisma.provider.update({
      where: { id },
      data,
    });
  }

  async removeProvider(id: string): Promise<void> {
    const provider = await this.prisma.provider.findUnique({
      where: { id },
    });

    if (!provider) throw new Error('Provider not found');

    await this.prisma.provider.delete({
      where: { id },
    });
  }
}
