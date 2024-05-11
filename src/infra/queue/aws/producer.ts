import { ConfigService } from '@nestjs/config';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Producer } from 'src/domain/job/application/queue/producer';

import { SQS } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { SQSProvider } from './providers/sqs.provider';

@Injectable()
export class AWSProducer implements Producer {
  constructor(
    private readonly sqsProvider: SQSProvider,
    private readonly configService: ConfigService,
  ) {}

  sendMessage(message: any): void {
    const sqsUrl = this.configService.getOrThrow('sqs.url');

    const messageId = new UniqueEntityID();

    const sqsMessage: SQS.SendMessageRequest = {
      QueueUrl: sqsUrl,
      MessageBody: JSON.stringify({
        messageId: messageId.toString(),
        message,
      }),
    };

    this.sqsProvider.sqs.sendMessage(sqsMessage, () => {
      console.log('send');
    });
  }
}
