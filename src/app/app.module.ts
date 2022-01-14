import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CarOwnersTableComponent } from './car-owners-table/car-owners-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditViewComponentComponent } from './add-edit-view-component/add-edit-view-component.component';
import { MaterialDesignModule } from './core/material-design/material-design.module';

@NgModule({
  declarations: [
    AppComponent,
    CarOwnersTableComponent,
    AddEditViewComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    MaterialDesignModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
