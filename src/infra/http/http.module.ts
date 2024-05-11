import { Module } from '@nestjs/common';
import { CreateJobController } from './controllers/job.controller';
import { CreateJobUseCase } from 'src/domain/job/application/use-cases/create-job';
import { AWSModule } from '../queue/aws/aws.module';

@Module({
  controllers: [CreateJobController],
  providers: [CreateJobUseCase],
  imports: [AWSModule],
})
export class HttpModule {}
