import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { ProfessorProvider } from "../../providers/professor/professor";
import { SigninPage } from "../../pages/signin/signin";
import { ClassPage } from "../../pages/class/class";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";


@IonicPage()
@Component({
  selector: 'page-professor-home',
  templateUrl: 'professor-home.html',
})
export class ProfessorHomePage {
  class: FirebaseListObservable<any[]>;
  subjects: FirebaseListObservable<any[]>[] = [];
  professorID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authProvider: AuthProvider, public professorProvider: ProfessorProvider, public db: AngularFireDatabase) {
    var user = authProvider.getUser();
    const professorRef = this.professorProvider.getByEmail(user.email);
    professorRef.on('child_added', snap => {
      this.professorID = snap.key;
      this.class = this.db.list('professorSubjects/' + snap.key);
      firebase.database().ref('professorSubjects/' + snap.key).on('child_added', snapshot => {
        this.subjects[snapshot.key] = this.db.list('professorSubjects/' + snap.key + '/' + snapshot.key)
      });
      
    });
  }

  classList(turma: any, subject: any){
    this.navCtrl.push(ClassPage, {turma: turma, professorID: this.professorID, subject: subject});
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorHomePage');
  }

}
