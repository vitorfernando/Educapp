import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubjectProvider } from "../../providers/subject/subject";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { EditSubjectPage } from "../edit-subject/edit-subject";
import { ChatPage } from "../chat/chat";
import { HomePage } from "../home/home";
import { SigninPage } from "../signin/signin";
import { AuthProvider } from "../../providers/auth/auth";
import { StudentProvider } from "../../providers/student/student";
import { ImagePicker } from "@ionic-native/image-picker";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { FirebaseApp } from "angularfire2";
/**
 * Generated class for the StudanteControllerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-studante-controller',
  templateUrl: 'studante-controller.html',
})
export class StudanteControllerPage {
  students : FirebaseListObservable<any[]>;
  isParent: any;
  studentName: any;
  imgPath: string;
  fileToUpload: any;

  constructor(public navCtrl: NavController, private subjectProvider: SubjectProvider,
    private studentProvider: StudentProvider, private authProvider: AuthProvider, public db: AngularFireDatabase) {
    var user = authProvider.getUser();
    var studentEmail = user.email;

    this.students = db.list('/students', {
      query: {
        orderByChild: 'parentEmail',
        equalTo: studentEmail
      }
    });

  }

  info(student) {
    this.navCtrl.push(HomePage, {student: student});
  }

}