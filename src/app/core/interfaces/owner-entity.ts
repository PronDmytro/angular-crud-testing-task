import { CarEntity } from './car-entity';

export interface OwnerEntity {
  id: string
  lastName: string
  firstName: string
  middleName: string
  cars: CarEntity[]
}
