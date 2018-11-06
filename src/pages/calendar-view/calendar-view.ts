import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from "../../providers/auth/auth";
import { StudentProvider } from "../../providers/student/student";
import { CalendarPage } from "../../pages/calendar/calendar";

@IonicPage()
@Component({
  selector: 'page-calendar-view',
  templateUrl: 'calendar-view.html',
})
export class CalendarViewPage {
  items: FirebaseListObservable<any[]>; 
  tests: FirebaseListObservable<any[]>; 
  events: FirebaseListObservable<any[]>;
  monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  viewTitle: string;
  eventSource = [];
  student: any;
  date: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public studentProvider: StudentProvider,
  public authProvider: AuthProvider, public db: AngularFireDatabase) {
    this.date = new Date();
    this.viewTitle = this.monthNames[this.date.getMonth()];
    if (navParams.data.date){
      this.date = navParams.data.date;
      this.viewTitle = this.monthNames[navParams.data.date.getMonth()];
    }
    this.getEvents(this.date.getDay());
    this.getTests(this.date);
  }

  public getData(selectedDate){
    var aux = selectedDate.getFullYear().toString() + '-';
    if (selectedDate.getMonth() + 1 < 10)
      aux += '0' + selectedDate.getMonth() + 1;
    else
      aux += selectedDate.getMonth() + 1 + '';

    aux += '-';  
      if (selectedDate.getDate() < 10)
      aux += '0' + selectedDate.getDate();
    else
      aux += selectedDate.getDate().toString();

    aux += 'T';
    return aux;
  }

  public getEvents(date){
    var user = this.authProvider.getUser();
    const studentRef = this.studentProvider.getByEmail(user.email);
    studentRef.on('child_added', snap => {
      this.student = snap.val();
      var path = '/classSubject/'+ this.student.class + '/' + date + '/';
      this.items = this.db.list(path);
    });
    const parentRef = this.studentProvider.getByParentEmail(user.email);
    parentRef.on('child_added', snap => {
      this.student = snap.val();
      var path = '/classSubject/'+ this.student.class + '/' + date + '/';
      this.items = this.db.list(path);
    });
  }

  public getTests(selected){
    var day = this.getData(selected);
    var user = this.authProvider.getUser();
    const studentRef = this.studentProvider.getByEmail(user.email);
    studentRef.on('child_added', snap => {
      this.student = snap.val();
      var path = '/event/'+ this.student.class;

      this.tests = this.db.list(path, {
        query: {
          orderByChild: 'date',
          equalTo: day
        }
      });
      var path = '/event/all';
      
      this.events = this.db.list(path, {
        query: {
          orderByChild: 'date',
          equalTo: day
        }
      });
    });
    const parentRef = this.studentProvider.getByParentEmail(user.email);
    parentRef.on('child_added', snap => {
      this.student = snap.val();
      var path = '/event/'+ this.student.class;

      this.tests = this.db.list(path, {
        query: {
          orderByChild: 'date',
          equalTo: day
        }
      });
      var path = '/event/all';
      
      this.events = this.db.list(path, {
        query: {
          orderByChild: 'date',
          equalTo: day
        }
      });
    });
  }

  calendar(){
    console.log('calendar ok');
    this.navCtrl.push(CalendarPage);
  }

  ionViewDidLoad() {

  }

  today(){
    this.date = new Date();
    this.viewTitle = this.monthNames[this.date.getMonth()];
    this.getEvents(this.date.getDay());
    this.getTests(this.date);
  }

}
