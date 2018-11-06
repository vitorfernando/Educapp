import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsProfessorPage } from './tabs-professor';

@NgModule({
  declarations: [
    TabsProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsProfessorPage),
  ],
})
export class TabsProfessorPageModule {}
