import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';

const materialModules = [
  MatSidenavModule,
  MatDividerModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatRippleModule,
  CommonModule,
];

@NgModule({
  declarations: [],
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
