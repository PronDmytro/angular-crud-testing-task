import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditViewComponentComponent } from './add-edit-view-component/add-edit-view-component.component';
import { CarOwnersTableComponent } from './car-owners-table/car-owners-table.component';

const routes: Routes = [
  {
    path: '', component: CarOwnersTableComponent,
  },
  {
    path: 'view/:id', component: AddEditViewComponentComponent,
  },
  {
    path: 'add', component: AddEditViewComponentComponent,
  },
  {
    path: 'edit/:id', component: AddEditViewComponentComponent,
  },
  {
    path: '**', redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
