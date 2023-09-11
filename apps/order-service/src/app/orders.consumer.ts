import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';
import { ProducerService } from './kafka/producer.service';
import { OrdersService } from './orders/orders.service';

@Injectable()
export class OrderConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private orderService : OrdersService,
    private producerService : ProducerService
    ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'order-confirmed' },
      config: { groupId: 'order-group' },
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
        const available = await this.orderService.confirmOrder('orderId');

      },
    });

    await this.consumerService.consume({
      topic: { topic: 'order-canceled' },
      config: { groupId: 'order-group' },
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
        await this.orderService.cancelOrder('orderId');
        
      },
    });
  }
}
