import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-calendar',
  templateUrl: 'add-calendar.html',
})
export class AddCalendarPage {
  eventName: string;
  date: string = new Date().toISOString();
  start: string = new Date().toISOString();
  end: string = new Date().toISOString();
  classID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.eventName = ''
    this.classID = ''

    if (this.navParams.data.class){
      this.eventName = this.navParams.data.class.name;
      this.date = this.navParams.data.class.date;
    }

    if (this.navParams.data.classID){
      this.classID = this.navParams.data.classID;
    }
  }

  save(){
    this.date = this.date.split("T",1)[0] + "T";
    this.start = this.start.split("T",2)[1].split(":", 3)[0] + ":" + this.start.split("T",2)[1].split(":", 3)[1];
    this.end = this.end.split("T",2)[1].split(":", 3)[0] + ":" + this.end.split("T",2)[1].split(":", 3)[1];

    console.log(this.eventName);

    var items = this.db.list('event/' + this.classID );
    items.push({
      'name': this.eventName,
      'date': this.date,
      'start': this.start,
      'end': this.end,
    });
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCalendarPage');
  }

}
