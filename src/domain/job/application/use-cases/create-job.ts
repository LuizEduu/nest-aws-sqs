import { Injectable } from '@nestjs/common';
import { Producer } from '../queue/producer';
import { Job } from '../../enterprise/entities/job';

interface CreateJobRequest {
  name: string;
  content: string;
}

@Injectable()
export class CreateJobUseCase {
  constructor(private readonly producer: Producer) {}

  execute({ name, content }: CreateJobRequest) {
    const job = Job.create({
      name,
      content,
      createdAt: new Date(),
    });

    this.producer.sendMessage(job);
  }
}
