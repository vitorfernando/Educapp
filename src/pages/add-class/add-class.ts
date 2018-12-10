import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-class',
  templateUrl: 'add-class.html',
})
export class AddClassPage {
  className: string;
  date: string = new Date().toISOString();
  professorID: any;
  subjectID: any;
  classID: any;
  comment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.className = '';
    this.subjectID = '';
    this.classID = '';
    this.professorID = '';

    if (this.navParams.data.class){
      this.className = this.navParams.data.class.assunto;
      this.date = this.navParams.data.class.date;
      this.comment = this.navParams.data.class.comment;
    }

    if (this.navParams.data.classID){
      this.subjectID = this.navParams.data.subjectID;
      this.classID = this.navParams.data.classID;
      this.professorID = this.navParams.data.professorID;
    }
  }

  save(){
    var items = this.db.list('professorClass/' + this.professorID + '/' + this.classID + '/' + this.subjectID);
    items.push({
      'assunto': this.className,
      'date': this.date,
      'comentarios': this.comment
    });
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClassPage');
  }

}
