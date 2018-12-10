import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentChatPage } from './student-chat';

@NgModule({
  declarations: [
    StudentChatPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentChatPage),
  ],
})
export class StudentChatPageModule {}
