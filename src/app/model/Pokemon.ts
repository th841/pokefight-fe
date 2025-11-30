export class Pokemon {
  name: string;
  types: string[];
  power: number;
  imageUrl: string;

  constructor(name: string, types: string[], power: number, imageUrl: string) {
    this.name = name;
    this.types = types;
    this.power = power;
    this.imageUrl = imageUrl;
  }
}
