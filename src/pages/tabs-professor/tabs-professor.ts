import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { ProfessorHomePage } from "../professor-home/professor-home";
import { ProfessorChatPage } from "../professor-chat/professor-chat";
import { SettingPage } from "../setting/setting";
import { SigninPage } from "../signin/signin";

@IonicPage()
@Component({
  selector: 'page-tabs-professor',
  templateUrl: 'tabs-professor.html',
})
export class TabsProfessorPage {
  showTab = false;
  homeRoot = ProfessorHomePage;
  chatRoot = ProfessorChatPage;
  settingRoot = SettingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public afAuth: AngularFireAuth) {
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
