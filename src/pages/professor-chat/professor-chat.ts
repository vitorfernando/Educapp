import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AuthProvider } from "../../providers/auth/auth";
import { ChatPage } from "../../pages/chat/chat";
import { ProfessorProvider } from "../../providers/professor/professor";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-professor-chat',
  templateUrl: 'professor-chat.html',
})
export class ProfessorChatPage {
  students: FirebaseListObservable<any[]>;
  professorName: any;
  professorID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider: AuthProvider, public professorProvider: ProfessorProvider, public db: AngularFireDatabase) {
    var user = authProvider.getUser();
    this.professorName = user.email;
    const professorRef = this.professorProvider.getByEmail(user.email);
    professorRef.on('child_added', snap => {
      this.professorName = {
        professorName: snap.val().name
      };
      this.professorID = snap.key;
      this.students = this.db.list('message/' + snap.key);
    });
  }

  chat(item: any){
    this.navCtrl.push(ChatPage, {itemStudent: item, professorName: this.professorName, professorID: this.professorID});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorChatPage');
  }

}
