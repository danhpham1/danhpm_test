import { Module } from '@nestjs/common';
import { ControllersModule } from './gateways/controllers/controllers.module';
import { ProvidersModule } from './providers.module';

@Module({
  imports: [ProvidersModule, ControllersModule],
})
export class AppModule {}
