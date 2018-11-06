import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from "angularfire2/auth";
import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StudentProvider } from '../providers/student/student';
import { AuthProvider } from '../providers/auth/auth';
import { TabsProfessorPage } from '../pages/tabs-professor/tabs-professor';
import * as firebase from 'firebase/app'
//import { Push, PushToken, CloudSettings } from '@ionic/cloud-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
  authProvider: AuthProvider, studentProvider: StudentProvider) {  
    platform.ready().then(() => {
      const authObserver = afAuth.authState.subscribe(user => {
        if (user){
          var studentEmail = user.email;
          const studentRef = studentProvider.getByEmail(studentEmail);
          studentRef.on('child_added', snap => {
            if (snap){
              this.rootPage = TabsPage;
              authObserver.unsubscribe();
            }
          });
          var parentRef = studentProvider.getByParentEmail(studentEmail);
          
          parentRef.on('child_added', snapshot => {
            if (snapshot){
              this.rootPage = TabsPage;
              authObserver.unsubscribe();
            }
          });
  
          var professorRef = firebase.database().ref('professors/').orderByChild('email').equalTo(user.email);
          professorRef.on('child_added', snapshot => {
            if (snapshot){
              this.rootPage = TabsProfessorPage;
              authObserver.unsubscribe();
            }
            });
        }else{
          this.rootPage = SigninPage;
          authObserver.unsubscribe();
        }
      });

      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
    });
  }

}     
