import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './books-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AddBookComponent,
    BookListComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class BooksModule { }
