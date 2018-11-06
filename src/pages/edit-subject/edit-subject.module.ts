import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSubjectPage } from './edit-subject';

@NgModule({
  declarations: [
    EditSubjectPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSubjectPage),
  ],
})
export class EditSubjectPageModule {}
