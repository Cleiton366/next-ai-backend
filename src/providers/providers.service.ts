import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) { }

  createProvider(data: CreateProviderDto) : Promise<Provider> {
    return this.prisma.provider.create({
      data,
    });
  }

  updateProvider(id: string, data: UpdateProviderDto) : Promise<Provider> {
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
