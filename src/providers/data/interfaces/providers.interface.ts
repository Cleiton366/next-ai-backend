interface Model {
  id: string,
  name: string
}

export default interface Providers {
  name: string,
  url: string,
  models: Model[]
}
