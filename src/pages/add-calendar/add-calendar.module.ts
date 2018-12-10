import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCalendarPage } from './add-calendar';

@NgModule({
  declarations: [
    AddCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCalendarPage),
  ],
})
export class AddCalendarPageModule {}
