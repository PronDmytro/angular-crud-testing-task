import { Injectable } from '@angular/core';
import { ICarOwnersService } from '../interfaces/icar-owners-service';
import { OwnerEntity } from '../interfaces/owner-entity';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CarEntity } from '../interfaces/car-entity';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersServiceService implements ICarOwnersService {

  private apiUrl = 'api/carOwners/';

  public constructor(
    private http: HttpClient,
  ) { }

  public createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    return this.http.post<OwnerEntity>(this.apiUrl, {
      id: uuid(),
      lastName: aLastName,
      firstName: aFirstName,
      middleName: aMiddleName,
      cars: aCars,
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      }),
    );
  }

  public deleteOwner(aOwnerId: string): void {
    this.http.delete(this.apiUrl + aOwnerId);
  }

  public editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(this.apiUrl + aOwner.id, aOwner);
  }

  public getOwnerById(aId: string): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(this.apiUrl + aId);
  }

  public getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.apiUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      }),
    );
  }

}
