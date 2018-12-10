import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { HomePage } from "../home/home";
import { CalendarPage } from "../calendar/calendar";
import { CalendarViewPage } from "../calendar-view/calendar-view";
import { StudentChatPage } from "../student-chat/student-chat";
import { StudanteControllerPage } from "../studante-controller/studante-controller";
import { SigninPage } from "../signin/signin";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  showTab = false;
  homeRoot = StudanteControllerPage;
  calendarRoot = CalendarPage;
  chatRoot = StudentChatPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user){
        this.showTab = true;
        authObserver.unsubscribe();
      }else{
        this.showTab = false;
        this.navCtrl.setRoot(SigninPage);
      }
    })
  }

  ionViewDidLoad() {
    const authObserver = this.afAuth.authState.subscribe(user => {
      if (!user){
        this.showTab = false;
        this.navCtrl.setRoot(SigninPage);
      }
    })
  }

}
