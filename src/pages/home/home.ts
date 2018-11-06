import { Component } from '@angular/core';
import { NavController, ToastController , AlertController} from 'ionic-angular';
import { SubjectProvider } from "../../providers/subject/subject";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { EditSubjectPage } from "../edit-subject/edit-subject";
import { ChatPage } from "../chat/chat";
import { SigninPage } from "../signin/signin";
import { AuthProvider } from "../../providers/auth/auth";
import { StudentProvider } from "../../providers/student/student";
import { ImagePicker } from "@ionic-native/image-picker";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { FirebaseApp } from "angularfire2";
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushObject: PushObject;
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
    private push: Push, public alertCtrl: AlertController) {
      var user = authProvider.getUser();
      var studentEmail = user.email;

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
          name: snap.val().name,
          ra: snap.key,
          parent: snap.val().parentEmail
        };

        this.items = this.db.list('studentSub/' + snap.key);
        firebase.database().ref('studentSubjects/' + snap.key).on('child_added', snapshot => {
          this.tests[snapshot.key] = this.db.list('studentSubjects/' + snap.key + '/' + snapshot.key);
        });

        var storageRef = firebase.storage().ref();
        storageRef.child('photos/' + snap.val().url).getDownloadURL().then(function(url) {
            var test = url;
            document.querySelector('img').src = test;

        }).catch(function(error) {

        });
      });
    //this.initPush(this.push);
  }

/**
  initPush(push){
    push.hasPermission()
    .then((res: any) => {

      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });

  // to initialize push notifications

  const options: PushOptions = {
     android: {},
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };

  const pushObject: PushObject = push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    console.log('Received a notification', notification);
    const alert = this.alertCtrl.create({
      title: notification.title,
      subTitle: notification.body,
      buttons: ['Dismiss']
    });
    alert.present();
  });

  pushObject.on('registration').subscribe((registration: any) => {
    console.log('Device registered', registration);
    if (!this.isParent){
      firebase.database().ref('students/' + this.studentName.ra).update({
        pushToken: registration.registrationId
      });
    }else{
      firebase.database().ref('students/' + this.studentName.ra).update({
       parentToken: registration.registrationId
      });
    }
  });

  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  escolherFoto(){
    this.imagePicker.hasReadPermission()
      .then(hasPermission => {
        if (hasPermission){
          this.pegarImagem();
        }else{
          this.solicitarPermissao();
        }
      })
        .catch(e => {
          console.error('Erro ao verificar permissão', e) ;
        })
  }

  solicitarPermissao() {
    this.imagePicker.requestReadPermission()
      .then(hasPermission => {
        if (hasPermission) {
          this.pegarImagem();
        } else {
          console.error('Permissão negada');
        }
      }).catch(error => {
        console.error('Erro ao solicitar permissão', error);
      });
  }
  pegarImagem() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1, //Apenas uma imagem
      outputType: 1 //BASE 64
    })
      .then(results => {

        if (results.length > 0) {
          this.imgPath = 'data:image/png;base64,' + results[0];
          this.fileToUpload = results[0];
        } else {
          this.fileToUpload = null;
        }
        this.studentProvider.uploadAndSave(this.student);
      })
      .catch(error => {
        console.error('Erro ao recuperar a imagem', error);
      });
  }
**/
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
    this.navCtrl.push(ChatPage, {item: item, studentName: this.studentName});
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
