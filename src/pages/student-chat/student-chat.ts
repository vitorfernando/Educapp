import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { ChatPage } from "../../pages/chat/chat";
import { StudentProvider } from "../../providers/student/student";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-student-chat',
  templateUrl: 'student-chat.html',
})
export class StudentChatPage {
  student: FirebaseListObservable<any[]>;
  subjects: FirebaseListObservable<any[]>;
  studentName: any;
  professorID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,
  public studentProvider: StudentProvider, public db: AngularFireDatabase) {
    var user = authProvider.getUser();
    const studentRef = this.studentProvider.getByEmail(user.email);
    studentRef.on('child_added', snap => {
    this.student = snap.val();
    this.studentName = {
      parentName: snap.val().parentName,
      name: snap.val().name,
      ra: snap.key
    };
    this.subjects = this.db.list('studentSub/' + snap.key);
  });

  var parentRef = studentProvider.getByParentEmail(user.email);

  parentRef.on('child_added', snap => {
    this.student = snap.val();
    this.studentName = {
        parentName: snap.val().parentName,
      name: snap.val().name,
      ra: snap.key
    };
    this.subjects = this.db.list('studentSub/' + snap.key);
  });
}

  chat(item: any){
    this.navCtrl.push(ChatPage, {item: item, studentName: this.studentName});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentChatPage');
  }

}
