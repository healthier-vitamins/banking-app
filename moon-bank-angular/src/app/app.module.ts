import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { AdminComponent } from './admin-page/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselPicturesComponent } from './main-page/components/carousel-pictures/carousel-pictures.component';
import { LoginComponent } from './main-page/components/login/login.component';
import { PageFooterComponent } from './main-page/components/page-footer/page-footer.component';
import { PublicAnnouncementComponent } from './main-page/components/public-announcement/public-announcement.component';
import { HomepageComponent } from './main-page/pages/homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user-page/user/user.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';


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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
