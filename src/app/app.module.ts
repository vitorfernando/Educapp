import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage'

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { ImagePicker } from "@ionic-native/image-picker";
import { NgCalendarModule } from "ionic2-calendar";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { EditSubjectPage } from '../pages/edit-subject/edit-subject';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { SettingPage } from '../pages/setting/setting';
import { ChatPage } from "../pages/chat/chat";
import { TabsProfessorPage } from "../pages/tabs-professor/tabs-professor";
import { ProfessorHomePage } from "../pages/professor-home/professor-home";
import { ControlPage } from "../pages/control/control";
import { ClassPage } from "../pages/class/class";
import { GradesPage } from "../pages/grades/grades";
import { AddClassPage } from "../pages/add-class/add-class";
import { ProfessorChatPage } from "../pages/professor-chat/professor-chat";
import { StudentChatPage } from "../pages/student-chat/student-chat";
import { StudanteControllerPage } from "../pages/studante-controller/studante-controller";
import { CalendarViewPage } from '../pages/calendar-view/calendar-view';
import { AddCalendarPage } from '../pages/add-calendar/add-calendar';
import { ClassControllerPage } from '../pages/class-controller/class-controller'; 

import { SubjectProvider } from '../providers/subject/subject';
import { AuthProvider } from '../providers/auth/auth';
import { StudentProvider } from '../providers/student/student';
import { CalendarProvider } from '../providers/calendar/calendar';
import { ProfessorProvider } from '../providers/professor/professor';

const firebaseConfig = {
    apiKey: "AIzaSyAGMsxDEhzcMKvgkDz-yMicw7W445Avjl8",
    authDomain: "educapp-32f89.firebaseapp.com",
    databaseURL: "https://educapp-32f89.firebaseio.com",
    projectId: "educapp-32f89",
    storageBucket: "educapp-32f89.appspot.com",
    messagingSenderId: "819038087337"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    EditSubjectPage,
    TabsPage,
    CalendarPage,
    SettingPage,
    ChatPage,
    TabsProfessorPage,
    ControlPage,
    ProfessorHomePage,
    ClassPage,
    GradesPage,
    AddClassPage,
    ProfessorChatPage,
    StudentChatPage,
    CalendarViewPage,
    AddCalendarPage,
    StudanteControllerPage,
    ClassControllerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgCalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    EditSubjectPage,
    TabsPage,
    CalendarPage,
    SettingPage,
    ChatPage,
    TabsProfessorPage,
    ControlPage,
    ProfessorHomePage,
    ClassPage,
    GradesPage,
    AddClassPage,
    ProfessorChatPage,
    StudentChatPage,
    CalendarViewPage,
    AddCalendarPage,
    StudanteControllerPage,
    ClassControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SubjectProvider,
    AuthProvider,
    StudentProvider,
    ImagePicker,
    CalendarProvider,
    ProfessorProvider
  ]
})
export class AppModule {}
