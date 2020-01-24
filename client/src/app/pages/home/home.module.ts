import { FooterModule } from './../../partials/footer/footer.module';
import { PreviewFiturModule } from './../../partials/preview-fitur/preview-fitur.module';
import { HowtoModule } from './../../partials/howto/howto.module';
import { CardModule } from './../../partials/card/card.module';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    HowtoModule,
    PreviewFiturModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
