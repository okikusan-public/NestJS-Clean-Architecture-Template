export class SampleNotFoundException extends Error {
  constructor(
    public readonly id: number,
    message?: string,
  ) {
    super(message || `Sample with ID ${id} not found`);
    this.name = 'SampleNotFoundException';
  }
}
