import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';
import { ProductsService } from './products/products.service';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class OrderConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private productService : ProductsService,
    private producerService : ProducerService
    ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'order-pending' },
      config: { groupId: 'order-group' },
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
        //For demonstration
        const available = await this.productService.isProductAvailable([]);
        if(available){
          await this.producerService.produce('order-confirmed', {
            value: 'orderId',
          });
        } else {
          await this.producerService.produce('order-canceled', {
            value: 'orderId',
          });
        }

      },
    });
  }
}
