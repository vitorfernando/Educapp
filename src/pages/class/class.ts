import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { ControlPage } from "../../pages/control/control";
import { GradesPage } from "../../pages/grades/grades";
import { AddClassPage } from "../../pages/add-class/add-class";
import { AddCalendarPage } from "../../pages/add-calendar/add-calendar";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {
  classID: any;
  professorID: any;
  subjectID: any;
  class: FirebaseListObservable<any[]>;
  tests: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.classID = '';
    this.professorID = '';
    this.subjectID = '';

    if (this.navParams.data.turma){
      this.classID = this.navParams.data.turma.$key;
      this.professorID = this.navParams.data.professorID;
      this.subjectID = this.navParams.data.subject.$key;
    }

    this.class = this.db.list('professorClass/' + this.professorID + '/' + this.classID + '/' + this.subjectID);
    this.tests = this.db.list('professorTests/' + this.professorID + '/' + this.classID + '/' + this.subjectID);
  }

  studentList(item: any){
    this.navCtrl.push(ControlPage, {classID: this.classID, professorID: this.professorID, class: item, subjectID: this.subjectID});
  }

  grades(){
    this.navCtrl.push(GradesPage, {classID: this.classID, professorID: this.professorID, subjectID: this.subjectID});
  }

  calendar(){
    this.navCtrl.push(AddCalendarPage, {classID: this.classID});
  }

  addClass(){
    this.navCtrl.push(AddClassPage, {classID: this.classID, professorID: this.professorID, subjectID: this.subjectID});
  }

  gradeList(item: any){
    this.navCtrl.push(GradesPage, {classID: this.classID, professorID: this.professorID, subjectID: this.subjectID, test: item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassPage');
  }

}
