import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerEntity } from '../core/interfaces/owner-entity';
import { SelectionModel } from '@angular/cdk/collections';
import { CarOwnersServiceService } from '../core/services/car-owners-service.service';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-owners-table',
  templateUrl: './car-owners-table.component.html',
  styleUrls: ['./car-owners-table.component.scss'],
})
export class CarOwnersTableComponent implements OnInit {

  public dataToDisplay: OwnerEntity[] | undefined;
  @ViewChild(MatTable)
  public table: MatTable<OwnerEntity> | undefined;
  public columnsToDisplay: string[] = ['lastName', 'firstName', 'middleName', 'carsCount'];
  public selectedRow = new SelectionModel<OwnerEntity>(false, []);

  public constructor(
    private carOwnersServiceService: CarOwnersServiceService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.carOwnersServiceService.getOwners().subscribe((data) => this.dataToDisplay = data);
  }

  public async view() {
    if (this.selectedRow.hasValue()) {
      await this.router.navigate([`view/${this.selectedRow.selected[0].id}`], { queryParams: { isEdit: false } });
    }
  }

  public async edit() {
    if (this.selectedRow.hasValue()) {
      await this.router.navigate([`edit/${this.selectedRow.selected[0].id}`], { queryParams: { isEdit: true } });
    }
  }

  public delete() {
    if (this.dataToDisplay && this.table) {
      this.carOwnersServiceService.deleteOwner(this.selectedRow.selected[0].id);
      this.dataToDisplay.splice(this.dataToDisplay.indexOf(this.selectedRow.selected[0], 0), 1);
      this.selectedRow.clear();
      this.table.renderRows();
    }
  }

}
