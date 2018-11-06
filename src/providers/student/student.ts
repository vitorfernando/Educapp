import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase';

@Injectable()
export class StudentProvider {
  items: FirebaseListObservable<any[]>;
  
    constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private fb: FirebaseApp) {
        var path = '/students/';
        this.items = db.list(path);
     }

    public getByEmail(email: string){
      return this.items.$ref.orderByChild('email').equalTo(email);
    }

    public getByParentEmail(email: string){
      return this.items.$ref.orderByChild('parentEmail').equalTo(email);
    }

    public isParent(email: string){
      var studentEmail = '';
      this.items.$ref.orderByChild('parentEmail').equalTo(email).on('child_added', snap => {
        if (snap)
          return snap.val().email;
      });
      return studentEmail;
    }

    public uploadAndSave(item: any){
      let student = {$key: item.key, name: item.name, url: '', fullPath: ''};

      if (student.$key){
        let storageRef = this.fb.storage().ref();
        let basePath = '/students/' + student.$key
        student.fullPath = basePath + '/' + student.name + '.png';

        let uploadTask = storageRef.child(student.fullPath).putString(item.fileToLoad, 'base64');
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (error) => {
            console.error(error);
          },
          () => {
            student.url = uploadTask.snapshot.downloadURL;
            this.save(student);
          });
      }
    }
  
    private save(item: any){
      if (item.$key){
        return this.items.update(item.$key, {url: item.url, fullPath: item.fullPath})
      }else{
        return this.items.push({ name: item.name });
      }
    }
  
    public remove(key: string){
      return this.items.remove(key);
    }
  
    public getAll(){
      return this.items;
  }

}
