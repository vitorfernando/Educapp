import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from "../../providers/auth/auth";
import { StudentProvider } from "../../providers/student/student";
import * as firebase from "firebase/app";
import * as moment from "moment";

@Injectable()
export class CalendarProvider {
  eventSource = [];
  items : any;
  events = [];
  student: any;

  public getEvents(date){
    var event = {startTime: new Date(), endTime: new Date(), allDay: false};
    var user = this.authProvider.getUser();
    const studentRef = this.studentProvider.getByEmail(user.email);
    studentRef.on('child_added', snap => {
      this.student = snap.val();      
    });

    var path = '/classSubject/' + this.student.class + '/monday';
    
    const ref = firebase.database().ref(path);
    ref.on('child_added', snap => {
      this.items = snap.val();
    });
    
  }

  constructor( private db: AngularFireDatabase, private studentProvider: StudentProvider,
  private authProvider: AuthProvider) {

  }

}
