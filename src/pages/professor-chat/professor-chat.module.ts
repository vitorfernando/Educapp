import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorChatPage } from './professor-chat';

@NgModule({
  declarations: [
    ProfessorChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorChatPage),
  ],
})
export class ProfessorChatPageModule {}
