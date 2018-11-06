import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorHomePage } from './professor-home';

@NgModule({
  declarations: [
    ProfessorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorHomePage),
  ],
})
export class ProfessorHomePageModule {}
