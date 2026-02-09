import { World as ECSYWorld } from 'ecsy'

export const model = (w: ECSYWorld) =>
  w.createEntity()
    //@ts-ignore - example purpose
    .addComponent(/* ... */)