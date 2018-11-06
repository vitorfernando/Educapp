import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class SubjectProvider {
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
      
   }

  public save(name: string, key: string){
    if (key){
      return this.items.update(key, {name: name})
    }else{
      return this.items.push({ name: name });
    }
  }

  public remove(key: string){
    return this.items.remove(key);
  }

  public getAll(){
    var path = '/subjects/';
    this.items = this.db.list(path);
    return this.items;
}

  public getByKey(key: string){
    var path = '/studentSubjects/' + key;
    this.items = this.db.list(path, {
      query: {
        orderByChild: 'nome'
      }
    });
    return this.items;
  }
}
