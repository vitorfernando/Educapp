import { Component } from '@angular/core';
import { NavController, ToastController , AlertController, NavParams} from 'ionic-angular';
import { SubjectProvider } from "../../providers/subject/subject";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { EditSubjectPage } from "../edit-subject/edit-subject";
import { ChatPage } from "../chat/chat";
import { SigninPage } from "../signin/signin";
import { StudanteControllerPage } from "../studante-controller/studante-controller";
import { AuthProvider } from "../../providers/auth/auth";
import { StudentProvider } from "../../providers/student/student";
import { ImagePicker } from "@ionic-native/image-picker";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { FirebaseApp } from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  tests: FirebaseListObservable<any[]>[] = [];
  student: FirebaseListObservable<any>;
  isParent: any;
  studentName: any;
  imgPath: string;
  fileToUpload: any;

  constructor(public navCtrl: NavController, private toast: ToastController,
    private subjectProvider: SubjectProvider, private studentProvider: StudentProvider,
    private authProvider: AuthProvider, private imagePicker: ImagePicker, public db: AngularFireDatabase,
    public alertCtrl: AlertController, public navParams: NavParams) {
      var user = authProvider.getUser();
      var studentEmail = user.email;
      if (this.navParams.data.student){
          studentEmail = this.navParams.data.student.email;
      }

      var parentRef = studentProvider.getByParentEmail(studentEmail);

      parentRef.on('child_added', snapshot => {
        if (snapshot){
          this.isParent = true;
          studentEmail = snapshot.val().email;
        }
      });
        const studentRef = this.studentProvider.getByEmail(studentEmail);
        studentRef.on('child_added', snap => {
        this.student = snap.val();
        this.studentName = {
          parentName: snap.val().parentName,
          name: snap.val().name,
          ra: snap.key,
          parent: snap.val().parentEmail
        };

        this.items = this.db.list('studentSub/' + snap.key);
        firebase.database().ref('studentSubjects/' + snap.key).on('child_added', snapshot => {
          this.tests[snapshot.key] = this.db.list('studentSubjects/' + snap.key + '/' + snapshot.key);
        });

        //var storageRef = firebase.storage().ref();
        //storageRef.child('photos/' + snap.val().url).getDownloadURL().then(function(url) {
            //var test = url;
            //document.querySelector('img').src = test;

        //}).catch(function(error) {

        //});
      });

  }

  back(){
    this.navCtrl.push(StudanteControllerPage);
  }

  addSubject(){
    this.navCtrl.push(EditSubjectPage);
  }

  editSubject(item: any){
    this.navCtrl.push(EditSubjectPage, {subject: item});
  }

  removeSubject(item: any){
    this.subjectProvider.remove(item.$key);
  }

  chat(item: any){
    this.navCtrl.push(ChatPage, {
      item: item,
      studentName: this.studentName
    });
  }

  signOut(){
    this.authProvider.signOutFirebase()
      .then(() => {
        this.navCtrl.setRoot(SigninPage);
      })
      .catch(e => {
        console.error(e);
      });
  }
}
