import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-page/admin/admin.component';
import { AdminDashboardComponent } from './admin-page/pages/admin-dashboard/admin-dashboard.component';
import { CreateCustomerComponent } from './admin-page/pages/create-customer/create-customer.component';
import { ShowAllCustomerComponent } from './admin-page/pages/show-all-customer/show-all-customer.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { RoleGuard } from './guards/role.guard';
import { HomepageComponent } from './main-page/homepage/homepage.component';
import { UserComponent } from './user-page/user/user.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'all-customer', component: ShowAllCustomerComponent },
      { path: 'create-customer', component: CreateCustomerComponent },
    ],
    canActivate: [RoleGuard],
    data: {
      roles: ['ROLE_ADMIN'],
    },
  },
  {
    path: 'user',
    component: UserComponent,
    children: [],
    canActivate: [RoleGuard],
    data: {
      roles: ['ROLE_USER'],
    },
  },
  { path: 'forbidden', component: ForbiddenPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
