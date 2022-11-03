import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselPicturesComponent } from './main-page/components/carousel-pictures/carousel-pictures.component';
import { LoginComponent } from './main-page/components/login/login.component';
import { PublicAnnouncementComponent } from './main-page/components/public-announcement/public-announcement.component';
import { HomepageComponent } from './main-page/pages/homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageFooterComponent } from './main-page/components/page-footer/page-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomepageComponent,
    PublicAnnouncementComponent,
    CarouselPicturesComponent,
    PageFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
