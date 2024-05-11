import { Module } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Producer } from 'src/domain/job/application/queue/producer';
import { AWSProducer } from './producer';
import { SQSProvider } from './providers/sqs.provider';

@Module({
  imports: [],
  providers: [
    {
      provide: SQS, // Provide the SQS service from the AWS SDK
      useFactory: (configService: ConfigService) => {
        const region = configService.get<string>('sqs.region');
        const accessKeyId = configService.get<string>('sqs.accessKeyId');
        const secretAccessKey = configService.get<string>(
          'sqs.secretAccessKey',
        );
        return new SQS({ region, accessKeyId, secretAccessKey });
      },
      inject: [ConfigService],
    },
    {
      provide: Producer,
      useClass: AWSProducer,
    },
    SQSProvider,
  ],
  exports: [SQS, Producer],
})
export class AWSModule {}
