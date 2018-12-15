import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'; 
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";


@IonicPage()
@Component({
  selector: 'page-class-controller',
  templateUrl: 'class-controller.html',
})
export class ClassControllerPage {
  classId: any;
  class: FirebaseListObservable<any[]>;
  ra: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public db: AngularFireDatabase) {
    
      if (this.navParams.data.item){
        this.classId = this.navParams.data.item.$key;
      }

    
    storage.get('ra').then((val) => {
      this.ra = val;
      console.log('studentClass/' + val + '/' + this.classId);
      this.class = this.db.list('studentClass/' + val + '/' + this.classId);  
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassControllerPage');
  }

}
