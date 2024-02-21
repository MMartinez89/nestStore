import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    //@Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const dataBase = this.configService.get('DATA_BASE');
    console.log(apiKey, ' ', dataBase);
    return `Hello World!`;
  }
}
