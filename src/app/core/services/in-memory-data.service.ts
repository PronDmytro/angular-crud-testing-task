import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { OwnerEntity } from '../interfaces/owner-entity';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(): {} {
    const data: OwnerEntity[]= [
      {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        lastName: 'Ivanov',
        firstName: 'Ivan',
        middleName: 'Ivanovich',
        cars: [
          {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            registrationNumber: 'AA7777AA',
            manufacturer: 'RR',
            model: 'Ghost',
            productionYear: 2021,
          },
        ],
      },
      {
        id: '2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        lastName: 'Ivanov',
        firstName: 'Oleg',
        middleName: 'Ivanovich',
        cars: [
          {
            id: '8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            registrationNumber: 'AA7777XX',
            manufacturer: 'RR',
            model: 'Ghost',
            productionYear: 2021,
          },
        ],
      },
    ];
    return { carOwners: data };
  }

}
