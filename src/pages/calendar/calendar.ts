import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { AuthProvider } from "../../providers/auth/auth";
import { StudentProvider } from "../../providers/student/student";
import { CalendarViewPage } from "../../pages/calendar-view/calendar-view";
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from "moment";
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;
  viewTitle: string;
  selectedDay = new Date();
  eventSource = [];
  today = this.getData(this.selectedDay);
  items: FirebaseListObservable<any[]>;
  tests: FirebaseListObservable<any[]>;
  student: any;

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay,
    locale: 'pt-BR'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private db: AngularFireDatabase, private studentProvider: StudentProvider,
    private authProvider: AuthProvider) {
     this.getEspecialEvents();
  }

  getEspecialEvents(){
    var time: any;
    var aux = [];
    var user = this.authProvider.getUser();
    const studentRef = this.studentProvider.getByEmail(user.email);
    studentRef.on('child_added', snap => {
      this.student = snap.val();
      var path = '/event/'+ this.student.class;
      var ref = firebase.database().ref(path);

      let events = this.eventSource;
      ref.orderByKey().on('child_added', snapshot => {
        time = snapshot.val();

        if (time){
          events.push({
            title: time.name,
            startTime: new Date(time.date + time.start + ':00'),
            endTime: new Date(time.date + time.end + ':00'),
            allDay: false
          });
        }
      });

          firebase.database().ref('event/all/').orderByKey().on('child_added', shot => {
            time = shot.val();
            if (time){
              events.push({
                title: time.name,
                startTime: new Date(time.date + time.start + ':00'),
                endTime: new Date(time.date + time.end + ':00'),
                allDay: false
              });
            }
          });

          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
          }, 1000);
        });

    const parentRef = this.studentProvider.getByParentEmail(user.email);
    parentRef.on('child_added', snap => {
      this.student = snap.val();
      var path = '/event/'+ this.student.class;
      var ref = firebase.database().ref(path);

      let events = this.eventSource;
      ref.orderByKey().on('child_added', snapshot => {
        time = snapshot.val();

        if (time){
          events.push({
            title: time.name,
            startTime: new Date(time.date + time.start + ':00'),
            endTime: new Date(time.date + time.end + ':00'),
            allDay: false
          });
        }
      });

          firebase.database().ref('event/all/').orderByKey().on('child_added', shot => {
            time = shot.val();
            if (time){
              events.push({
                title: time.name,
                startTime: new Date(time.date + time.start + ':00'),
                endTime: new Date(time.date + time.end + ':00'),
                allDay: false
              });
            }
          });

          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
          }, 1000);
        });

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
    });
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
  //  if (ev.selectedTime.getDate() != this.selectedDay.getDate()){
      //this.navCtrl.setRoot(CalendarViewPage, {date: ev.selectedTime});
    //}
      // {day: ev.selectedTime.getDate(), mounth: ev.ev.selectedTime.getMounth()}
      //this.selectedDay = ev.selectedTime;
      //this.today = this.getData(this.selectedDay);
      //this.getEvents(this.selectedDay.getDay());
      //this.getTests(this.selectedDay);
  }

  onEventSelected(ev){
    console.log('entrou eventSelected');
    //this.navCtrl.setRoot(CalendarViewPage, {day: event.selectedDate(), mounth: event.selectedMounth()});
    /*let start = event.startTime;
    let end = event.startEnd;

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: '+ end,
      buttons: ['OK']
    });
    alert.present();*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
