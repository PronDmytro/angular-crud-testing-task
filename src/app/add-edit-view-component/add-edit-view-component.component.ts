import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CarOwnersServiceService } from '../core/services/car-owners-service.service';
import { v4 as uuid } from 'uuid';
import { CarEntity } from '../core/interfaces/car-entity';
import { OwnerEntity } from '../core/interfaces/owner-entity';

export enum ViewMode {
  EDIT,
  ADD,
  SHOW,
}

@Component({
  selector: 'app-add-edit-view-component',
  templateUrl: './add-edit-view-component.component.html',
  styleUrls: ['./add-edit-view-component.component.scss'],
})
export class AddEditViewComponentComponent implements OnInit {

  public isLoading = true;
  public id: string | undefined;
  public ViewMode: typeof ViewMode = ViewMode;
  public viewMode: ViewMode = this.ViewMode.ADD;
  public isError = false;
  public isShowMode = false;
  private isEditMode = false;

  public userForm: FormGroup;
  public ownerData: OwnerEntity | undefined;

  @ViewChild('table') public carsFormTable: MatTable<any> | undefined;
  public displayedColumns = ['registrationNumber', 'manufacturer', 'model', 'productionYear', 'deleteBtn'];
  public carsDataSource: MatTableDataSource<AbstractControl>;
  public carsForm: FormGroup;

  get getCarFormsArray() {
    return this.carsForm.get('cars') as FormArray;
  }

  public constructor(
    private carOwnersServiceService: CarOwnersServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = formBuilder.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
    });

    this.carsForm = this.formBuilder.group({
      cars: this.formBuilder.array([]),
    });
    this.carsDataSource = new MatTableDataSource(this.getCarFormsArray.controls);
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((param) => {
      this.isEditMode = (param['isEdit'] == 'true');
    });

    if (this.id) {
      if (this.isEditMode) {
        this.viewMode = this.ViewMode.EDIT;
      } else {
        this.viewMode = this.ViewMode.SHOW;
        this.isShowMode = true;
      }

      this.carOwnersServiceService.getOwnerById(this.id).subscribe(
        {
          next: (data) => {
            this.ownerData = data;
            this.userForm.setValue({
              lastName: this.ownerData.lastName,
              firstName: this.ownerData.firstName,
              middleName: this.ownerData.middleName,
            });

            if (this.isShowMode) {
              this.userForm.controls['lastName'].disable();
              this.userForm.controls['firstName'].disable();
              this.userForm.controls['middleName'].disable();
            }

            this.ownerData.cars.forEach((car) => {
              this.addRow(car);
            });

            this.isLoading = false;
          },
          error: () => {
            this.isError = true;
            this.isLoading = false;
          },
        },
      );
    } else {
      this.addRow();
      this.isLoading = false;
    }
  }

  public trackRows(index: number, row: AbstractControl) {
    return row.value.id;
  }

  public isFormsValid() {
    return this.getCarFormsArray.valid && this.userForm.valid;
  }

  public deleteRow(row: AbstractControl) {
    if (this.carsDataSource.data.length != 1) {
      this.carsDataSource.data.splice(this.carsDataSource.data.indexOf(row, 0), 1);
      this.carsFormTable!.renderRows();
    }
  }

  private addRow(data?: CarEntity) {
    const rows = this.getCarFormsArray;
    rows.push(
      this.formBuilder.group({
        id: data ? data.id : uuid(),
        registrationNumber: [
          { value: data ? data.registrationNumber : '', disabled: this.isShowMode },
          [Validators.required, Validators.pattern('^[ABCEHIKMOPTX]{2}\\d{4}(?<!0{4})[ABCEHIKMOPTX]{2}$')],
        ],
        manufacturer: [
          { value: data ? data.manufacturer : '', disabled: this.isShowMode },
          Validators.required,
        ],
        model: [
          { value: data ? data.model : '', disabled: this.isShowMode },
          Validators.required,
        ],
        productionYear: [
          { value: data ? data.productionYear : '', disabled: this.isShowMode },
          [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())],
        ],
      }),
    );

    if (data) {
      this.carsFormTable!.renderRows();
    }
  }

  public createRow() {
    this.addRow();
    this.carsFormTable!.renderRows();
  }


  public submit() {
    if (this.isFormsValid() && !this.isShowMode) {
      const lastName = this.userForm.get('lastName')?.value;
      const firstName = this.userForm.get('firstName')?.value;
      const middleName = this.userForm.get('middleName')?.value;
      const rows = this.getCarFormsArray;

      const cars: CarEntity[] = [];
      rows.controls.forEach((row) => {
        cars.push({
          id: row.get('id')?.value,
          registrationNumber: row.get('registrationNumber')?.value,
          manufacturer: row.get('manufacturer')?.value,
          model: row.get('model')?.value,
          productionYear: row.get('productionYear')?.value,
        });

        if (lastName && firstName && middleName) {
          if (this.viewMode.valueOf() === this.ViewMode.ADD) {
            this.carOwnersServiceService.createOwner(lastName, firstName, middleName, cars).subscribe({
              next: async () => {
                await this.router.navigate(['']);
              },
            });
          } else {
            this.carOwnersServiceService.editOwner(Object.assign(this.ownerData, {
              lastName: lastName,
              firstName: firstName,
              middleName: middleName,
              cars: cars,
            })).subscribe({
              next: async () => {
                await this.router.navigate(['']);
              },
            });
          }
        }
      });
    }
  }

}
