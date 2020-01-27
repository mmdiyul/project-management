import { FiturModule } from './pages/fitur/fitur.module';
import { FooterModule } from './partials/footer/footer.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { NavbarModule } from './partials/navbar/navbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HowtoComponent } from './partials/howto/howto.component';
import { PreviewFiturComponent } from './partials/preview-fitur/preview-fitur.component';
import { FiturComponent } from './pages/fitur/fitur.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NavbarModule,
    LoginModule,
    HomeModule,
    FiturModule,
    MatCardModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
