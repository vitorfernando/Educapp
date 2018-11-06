import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthProvider } from '../../providers/auth/auth';
import { StudentProvider } from '../../providers/student/student';
import { TabsPage } from '../tabs/tabs';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SignupPage } from '../signup/signup';
import { TabsProfessorPage } from "../tabs-professor/tabs-professor";
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
  showTab = false;
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthProvider,
    public studentProvider: StudentProvider) {


  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

  signIn() {
    console.log(this.user.email);
    console.log(this.user.password);
    if (this.form.form.valid) {
          const studentRef = this.studentProvider.getByEmail(this.user.email);
          studentRef.on('child_added', snap => {
            if (snap){
              this.authService.signIn(this.user)
                .then(() => {
                  this.navCtrl.setRoot(TabsPage);
                })
                .catch((error: any) => {
                  let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
                  if (error.code == 'auth/invalid-email') {
                    toast.setMessage('O e-mail digitado não é valido.');
                  } else if (error.code == 'auth/user-disabled') {
                    toast.setMessage('O usuário está desativado.');
                  } else if (error.code == 'auth/user-not-found') {
                    toast.setMessage('O usuário não foi encontrado.');
                  } else if (error.code == 'auth/wrong-password') {
                    toast.setMessage('A senha digitada não é valida.');
                  }
                  toast.present();
                });
              }
            });

                const parentRef = this.studentProvider.getByParentEmail(this.user.email);
                parentRef.on('child_added', snapshot => {
                  if (snapshot){
                    this.authService.signIn(this.user)
                    .then(() => {
                      this.navCtrl.setRoot(TabsPage);
                    })
                    .catch((error: any) => {
                      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
                      if (error.code == 'auth/invalid-email') {
                        toast.setMessage('O e-mail digitado não é valido.');
                      } else if (error.code == 'auth/user-disabled') {
                        toast.setMessage('O usuário está desativado.');
                      } else if (error.code == 'auth/user-not-found') {
                        toast.setMessage('O usuário não foi encontrado.');
                      } else if (error.code == 'auth/wrong-password') {
                        toast.setMessage('A senha digitada não é valida.');
                      }
                      toast.present();
                    });
                  }
                });
            var professorRef = firebase.database().ref('professors/').orderByChild('email').equalTo(this.user.email);
            professorRef.on('child_added', snapshot => {
              if (snapshot){
                this.authService.signIn(this.user)
                .then(() => {
                  this.navCtrl.setRoot(TabsProfessorPage);
                })
                .catch((error: any) => {
                  let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
                  if (error.code == 'auth/invalid-email') {
                    toast.setMessage('O e-mail digitado não é valido.');
                  } else if (error.code == 'auth/user-disabled') {
                    toast.setMessage('O usuário está desativado.');
                  } else if (error.code == 'auth/user-not-found') {
                    toast.setMessage('O usuário não foi encontrado.');
                  } else if (error.code == 'auth/wrong-password') {
                    toast.setMessage('A senha digitada não é valida.');
                  }
                  toast.present();
                });
              }
            });
      }
    }

}
