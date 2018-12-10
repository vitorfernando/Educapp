import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages: FirebaseListObservable<any[]>;
  message: string;
  parent: string;
  name: string;
  ra: any;
  codProf = "";
  isParent = 1;

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.ra = '';
    this.codProf = '';

    if (this.navParams.data.studentName){
      this.parent = this.navParams.data.studentName.parentName;
      this.name = this.navParams.data.studentName.name;
      this.ra = this.navParams.data.studentName.parentName;
    }

    if (this.navParams.data.item){
      this.codProf = this.navParams.data.item.professor;
    }

    if (this.navParams.data.itemStudent){
      this.parent = this.navParams.data.professorName.professorName;
      this.ra = this.navParams.data.itemStudent.$key;
      this.codProf = this.navParams.data.professorID;
      this.isParent = 0;
    }
    this.messages = db.list('message/' + this.codProf + '/' + this.ra);
  }

  enviar(){
    var date = new Date();
    let m = {
      parent: this.isParent,
      name: this.parent,
      text: this.message,
      hour: date.getHours() + ':' + date.getMinutes()
    };
    this.messages.push(m)
      .then(() => {
        this.message = '';
      })
  }

  ionViewDidLoad() {
    var myDiv = document.getElementById("divMessage");
    myDiv.scrollTop = myDiv.scrollHeight;

  }

}
