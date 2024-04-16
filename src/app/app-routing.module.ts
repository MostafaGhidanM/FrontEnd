import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./books/books.module`).then(m => m.BooksModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
