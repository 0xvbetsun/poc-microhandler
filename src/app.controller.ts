import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('HANDLER_SERVICE') private client: ClientProxy) {}

  @Get('/import/:entity')
  import(@Param() params) {
    if (params.entity === 'currencies') {
      return this.client.send({ cmd: 'sponge.import.currencies' }, {});
    }
    return this.client.send(
      { cmd: `sponge.import.currency.${params.entity}` },
      {},
    );
  }
}
