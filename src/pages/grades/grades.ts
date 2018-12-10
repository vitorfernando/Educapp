import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
//import * as require from "typescript-require";
//import * as module from "common-js";

@IonicPage()
@Component({
  selector: 'page-grades',
  templateUrl: 'grades.html',
})
export class GradesPage {
  students: FirebaseListObservable<any[]>;
  className: string;
  studentsName = [];
  grades = [];
  classID: any;
  subjectID: any;
  profID: any;
  testID: any;
  testName: string;
  peso: number;
  comments = [];
  edit = false;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController) {
    this.classID = '';
    this.profID = '';
    this.subjectID = '';
    this.testID = '';

    if (this.navParams.data.classID){
      this.subjectID = this.navParams.data.subjectID;
      this.profID = this.navParams.data.professorID;
      this.classID = this.navParams.data.classID;
    }
    if (this.navParams.data.test){
      this.edit = true;
      this.testID = this.navParams.data.test.$key;
      this.testName = this.navParams.data.test.nome;
      this.peso = this.navParams.data.test.peso;
    }

    this.students = this.db.list('class/' + this.classID);
    this.students.$ref.on('child_added', snap => {
      this.studentsName.push({
        'ra': snap.key,
        'name': snap.val().name
      });

      if (this.edit){
        for (let student of this.studentsName){
          var path = 'studentSubjects/' + student.ra + '/' + this.subjectID;      
          this.db.database.ref(path).orderByKey().equalTo(this.testID).on('child_added', snap => {
            this.grades[student.name] = snap.val().grade;
            this.comments[student.name] = snap.val().comments;
          });
        }
      }
    });
    

    firebase.database().ref('subjects/').orderByKey().equalTo(this.subjectID).on('child_added', snapshot => {
      this.className = this.classID + ' - ' + snapshot.val().name;
    });    
  }

  save(){
    if (!this.edit){
      var path = 'professorTests/' + this.profID + '/' + this.classID + '/' + this.subjectID;
      firebase.database().ref(path).push({
        nome: this.testName,
        peso: this.peso
      });

      firebase.database().ref(path).orderByChild('nome').equalTo(this.testName).on('child_added', snap => {
        this.testID = snap.key;
      });

      console.log(this.testID);
      for (let student of this.studentsName){
        if (this.grades[student.name]){
          firebase.database().ref('studentSubjects/' + student.ra + '/' + this.subjectID + '/' + this.testID).update({
            nome: this.testName,
            peso: this.peso,
            grade: this.grades[student.name],
            comments: this.comments[student.name]
          });
        }
      }
    }else{  //edit
      for (let student of this.studentsName){
        if (this.grades[student.name]){
          firebase.database().ref('studentSubjects/' + student.ra + '/' + this.subjectID + '/' + this.testID).update({
            nome: this.testName,
            peso: this.peso,
            grade: this.grades[student.name],
            comments: this.comments[student.name]
          });
        }
      }
    }
    this.navCtrl.pop();
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradesPage');
  }

  

}
