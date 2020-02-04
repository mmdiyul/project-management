import { BackendModule } from './backend/backend.module';
import { FiturModule } from './pages/fitur/fitur.module';
import { FooterModule } from './partials/footer/footer.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { NavbarModule } from './partials/navbar/navbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AboutModule } from './pages/about/about.module';
import { ProjectModule } from './pages/project/project.module';

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
    FooterModule,
    BackendModule,
    HttpClientModule,
    ProjectModule,
    AboutModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
