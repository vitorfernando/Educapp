import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {
  classID: any;
  profID: any;
  subjectID: any;
  className: any;
  classComment: any;
  classDate: any;
  aula: any;
  students: FirebaseListObservable<any[]>;
  showCheck = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.classID = '';
    this.profID = '';
    this.aula = '';
    this.subjectID = '';

    if (this.navParams.data.classID){
      this.aula = this.navParams.data.class.$key;
      this.profID = this.navParams.data.professorID;
      this.classID = this.navParams.data.classID;
      this.subjectID = this.navParams.data.subjectID;
    }

    if (this.navParams.data.class){
      this.className = this.navParams.data.class.assunto;
      this.classComment = this.navParams.data.class.comentarios;
      this.classDate = this.navParams.data.class.date;
    }

    this.students = this.db.list('class/' + this.classID);
    this.students.$ref.on('child_added', snap => {
      this.showCheck.push({
        ra: snap.key,
        name: snap.val().name,
        check: false
      });
    });
  }

  check(item: any){
    for (let i of this.showCheck){
      if (i.ra == item.$key){
        var btn = document.getElementById(item.$key);
        if (i.check){
          btn.style.backgroundColor = "#FFFFFF"
          i.check = false;
        }else{
          btn.style.backgroundColor = "#6495ED"
          i.check = true;
        }
        break;
      }
    }
  }

  save(){
    console.log(this.subjectID);
    var aux = this.db.list('professorClass/' + this.profID + '/'  + this.classID + '/' + this.subjectID + '/' + this.aula + '/presentes/');
    
    for (let i of this.showCheck){
      var pathProfClass = 'professorClass/' + this.profID + '/'  + this.classID + '/' + this.subjectID + '/' + this.aula + '/presentes/' + i.ra;
      var path = 'studentClass/' + i.ra + '/' + this.subjectID + '/' + this.aula;

      if (i.check){
        firebase.database().ref(path).set({
          name: this.className,
          date: this.classDate,
          comment: this.classComment
        });

        firebase.database().ref(pathProfClass).set({
          name: i.name
        });
      }else{
        aux.remove(i.ra);
      }
      
    }
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
  }

}
