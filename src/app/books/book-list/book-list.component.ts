import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any = [];
  sortOrder: string = "";
  isOneColumn: boolean = false;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }
  addBook() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '750px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks()
      }
    });

  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  deleteBook(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this book?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.bookService.deleteBook(id).subscribe(res => {
          this.toastr.success('Deleted Successfully', 'Success', {
            timeOut: 2000
          });
          this.spinner.hide();
          this.loadBooks();
        }, error => {
          this.toastr.error(error.error.message);
          this.spinner.hide();
        });
      }
    });
  }

  toggleView() {
    this.isOneColumn = !this.isOneColumn;
  }
  
}
