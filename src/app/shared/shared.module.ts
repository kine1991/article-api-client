import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SpinnerComponent,
    PageNotFoundComponent,
  ]
})
export class SharedModule { }
