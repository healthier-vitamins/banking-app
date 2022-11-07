import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-page/admin/admin.component';
import { HomepageComponent } from './main-page/pages/homepage/homepage.component';
import { UserComponent } from './user-page/user/user.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'admin', component: AdminComponent,
    children: [
    
    ],
    canActivate: [], 
    data: { 
      roles: ['ROLE_ADMIN'] }},
  {path: 'user', component: UserComponent, 
  children: [
    
  ], 
  canActivate: [], 
  data: { 
    roles : ['ROLE_USER'] }}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
