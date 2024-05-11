import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateJobUseCase } from 'src/domain/job/application/use-cases/create-job';
import { Job } from 'src/domain/job/enterprise/entities/job';

@Controller('/job')
export class CreateJobController {
  constructor(private readonly createJob: CreateJobUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: Job) {
    const { content, name } = body;

    this.createJob.execute({
      content,
      name,
    });

    return;
  }
}
