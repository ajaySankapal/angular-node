import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { UserProductsComponent } from './user-products/user-products.component';

const routes: Routes = [
  {
    path: 'admin/products',
    component: AdminProductsComponent,
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    component: LayoutComponent,

  },

  {
    path: 'user/products',
    component: UserProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
