import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface JobProps {
  content: string;
  name: string;
  createdAt: Date;
}

export class Job extends Entity<JobProps> {
  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  static create(props: JobProps, id?: UniqueEntityID) {
    const job = new Job(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return job;
  }
}
