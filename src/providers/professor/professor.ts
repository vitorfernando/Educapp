import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ProfessorProvider {
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    var path = 'professors/';
    this.items = db.list(path);
  }

  public getByEmail(email: string){
    return this.items.$ref.orderByChild('email').equalTo(email);
  }

}
