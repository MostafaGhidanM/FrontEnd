import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseApi = "http://localhost:8000/api/books";

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.baseApi);
  }
  addBook(model: any) {
    return this.http.post(this.baseApi + '/store', model);
  }

  deleteBook(id: any) {
    return this.http.get(this.baseApi + '/delete/' + id)
  }
  updateBook(id: any, model: any) {
    return this.http.put(this.baseApi + '/update/' + id, model)

  }
}
