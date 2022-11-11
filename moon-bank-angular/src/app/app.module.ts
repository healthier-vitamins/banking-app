import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AdminComponent } from './admin-page/admin/admin.component';
import { SidenavComponent } from './admin-page/components/sidenav/sidenav.component';
import { CreateCustomerComponent } from './admin-page/pages/create-customer/create-customer.component';
import { ShowAllCustomerComponent } from './admin-page/pages/show-all-customer/show-all-customer.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { CarouselPicturesComponent } from './main-page/components/carousel-pictures/carousel-pictures.component';
import { LoginComponent } from './main-page/components/login/login.component';
import { PageFooterComponent } from './main-page/components/page-footer/page-footer.component';
import { PublicAnnouncementComponent } from './main-page/components/public-announcement/public-announcement.component';
import { HomepageComponent } from './main-page/homepage/homepage.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user-page/user/user.component';
import { CustomerFormComponent } from './admin-page/components/customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomepageComponent,
    PublicAnnouncementComponent,
    CarouselPicturesComponent,
    PageFooterComponent,
    UserComponent,
    AdminComponent,
    ForbiddenPageComponent,
    AdminNavbarComponent,
    ClockComponent,
    SidenavComponent,
    ShowAllCustomerComponent,
    CreateCustomerComponent,
    CustomerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
  ],
  providers: [CookieService, AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
