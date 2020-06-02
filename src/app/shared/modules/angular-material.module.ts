import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {
//   MatInputModule,
//   MatCardModule,
//   MatButtonModule,
//   MatToolbarModule,
//   MatExpansionModule,
//   MatProgressSpinnerModule,
//   MatPaginatorModule,
//   MatDialogModule,
//   MatIconModule,
//   MatSidenavModule,
//   MatListModule,
//   MatMenuModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatButtonToggleModule,
//   MatSelectModule,
//   MatTableModule,
//   MatAutocompleteModule,
//   MatSnackBarModule,
// } from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ]
})
export class AngularMaterialModule { }
