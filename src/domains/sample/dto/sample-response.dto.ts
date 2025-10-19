export class SampleResponseDto {
  id: number;
  name: string;
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static fromEntity(entity: {
    id: number;
    name: string;
    description: string;
  }): SampleResponseDto {
    return new SampleResponseDto(entity.id, entity.name, entity.description);
  }
}
