import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    //@Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('POSTGRES') private clientPostgres: Client,
  ) {}
  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const dataBase = this.configService.get('DATA_BASE');
    console.log(apiKey, ' ', dataBase);
    return `Hello World!`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPostgres.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
