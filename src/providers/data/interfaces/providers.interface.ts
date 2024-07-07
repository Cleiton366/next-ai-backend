interface Model {
  id: string;
  name: string;
}

export default interface Providers {
  id: string;
  name: string;
  url: string;
  documentationUrl: string;
  models: Model[];
}
