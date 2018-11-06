import { Component } from '@angular/core';
import { SubjectProvider } from '../../providers/subject/subject';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-subject',
  templateUrl: 'edit-subject.html',
})
export class EditSubjectPage {
  subjectName: string;
  subjectKey: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private subjectProvider: SubjectProvider) {
    this.subjectName = '';
    this.subjectKey = '';

    if (this.navParams.data.subject){
      this.subjectName = this.navParams.data.subject.name;
      this.subjectKey = this.navParams.data.subject.$key;
    }
  }

  save(){
    this.subjectProvider.save(this.subjectName, this.subjectKey);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubjectPage');
  }

}
