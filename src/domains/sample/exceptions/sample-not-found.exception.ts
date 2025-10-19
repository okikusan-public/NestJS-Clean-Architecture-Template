import { NotFoundException } from '@nestjs/common';

export class SampleNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Sample with ID ${id} not found`);
  }
}
