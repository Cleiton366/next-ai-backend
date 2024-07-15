import { ApiProperty } from "@nestjs/swagger";

class Model {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export default class Providers {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  documentationUrl: string;
  
  @ApiProperty()
  models: Model[];
}
