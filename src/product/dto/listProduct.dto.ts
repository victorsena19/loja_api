class ListCharacteristicProductDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly characteristics: ListCharacteristicProductDTO[],
    readonly images: ListImageProductDTO[],
  ) {}
}
