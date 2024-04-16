import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book.service';





@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddBookComponent>,
    public matDialog: MatDialog,
    private service: BookService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  bookForm!: FormGroup;
  f: any;
  categories: any;
  fileName = ''
  cats: any = [
    { name: "History", id: '1' },
    { name: "Novel", id: '2' }
  ]


  ngOnInit(): void {
    console.log('in add book')
    this.createForm();
  }


  createForm() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      desc: ['', [Validators.required, Validators.maxLength(100)]],
      img: ['', [Validators.required]],
      // category_ids: [[], [Validators.required]]
    });
  }

  selectImage(event: any) {
    this.fileName = event.target.value
    this.bookForm.get('img')?.setValue(event.target.files[0])
    console.log(event.target)
  }

  createTask() {
    if (this.bookForm.valid) {
      const titleControl = this.bookForm.get('title');
      const descControl = this.bookForm.get('desc');
      const imgControl = this.bookForm.get('img');
      // const categoryIdsControl = this.bookForm.get('category_ids');

      if (titleControl && descControl && imgControl) {
        const formData = new FormData();
        formData.append('title', titleControl.value);
        formData.append('desc', descControl.value);
        formData.append('img', imgControl.value);
        // formData.append('category_ids', JSON.stringify(categoryIdsControl.value));

        this.service.addBook(formData).subscribe(
          response => {
            this.toastr.success('Task created successfully', 'Success')
            this.spinner.hide()
            this.dialog.close(true)
          }, error => {
            this.spinner.hide()
            this.toastr.error(error.error.message)
          })
      } else {
        console.error('Form controls are null.');
        // Handle the case where form controls are null
      }
    } else {
      // Form is invalid, mark all fields as touched to show errors
      this.bookForm.markAllAsTouched();
    }
  }
  updateTask() {

  }


}
