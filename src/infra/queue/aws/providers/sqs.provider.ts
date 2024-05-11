import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQS } from 'aws-sdk';

@Injectable()
export class SQSProvider {
  public readonly sqs: SQS;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.getOrThrow('sqs.region');
    const accessKeyId = this.configService.getOrThrow('sqs.accessKeyId');
    const secretAccessKey = this.configService.getOrThrow(
      'sqs.secretAccessKey',
    );
    this.sqs = new SQS({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }
}
