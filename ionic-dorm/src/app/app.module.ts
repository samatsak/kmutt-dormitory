import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';

import { FavPage } from '../pages/favorite/favorite';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { DormDetailPage } from '../pages/dorm-detail/dorm-detail';
import { AccountPage } from '../pages/account/account';
import { SortPage } from '../pages/sort/sort';
import { FilterPage } from '../pages/filter/filter';
import { AddChatPage } from '../pages/add-chat/add-chat';
import { ChatPrivatePage } from '../pages/chat-private/chat-private';
import { ChatsPage } from '../pages/chats/chats';
import { ChatsDormPage } from '../pages/chats-dorm/chats-dorm';
import { DormChatPrivatePage } from '../pages/dorm-chat-private/dorm-chat-private';
import { DormPage } from '../pages/dorm/dorm'
import { TutorialPage } from '../pages/tutorial/tutorial'

import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http' ;
import { FormsModule } from '@angular/forms' ;
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2' ;
import { AngularFireDatabaseModule } from 'angularfire2/database' ;
import { AngularFireAuth } from 'angularfire2/auth';

import { DataProvider } from '../providers/data/data';
import { AuthProvider } from '../providers/auth/auth';
import { ChatProvider } from '../providers/chat/chat';
import { UserProvider } from '../providers/user/user';
import { RequestsProvider } from '../providers/requests/requests';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { Ionic2RatingModule } from 'ionic2-rating';
import { DormProvider } from '../providers/dorm/dorm';
import { IonicStorageModule } from '@ionic/storage';

export const config = {
    apiKey: "AIzaSyD0J8IO3jeDZ9nlytylJWJtMICEmOtTRiI",
    authDomain: "kmutt-dorm.firebaseapp.com",
    databaseURL: "https://kmutt-dorm.firebaseio.com",
    projectId: "kmutt-dorm",
    storageBucket: "kmutt-dorm.appspot.com",
    messagingSenderId: "687379936171"
};


@NgModule({
  declarations: [
    MyApp,
    FavPage,
    HomePage,
    TabsPage,
    RegisterPage,
    DormDetailPage,
    AccountPage,
    SortPage,
    DormPage,
    FilterPage,
    AddChatPage,
    ChatPrivatePage,
    ChatsPage,
    ChatsDormPage,
    DormChatPrivatePage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavPage,
    HomePage,
    TabsPage,
    RegisterPage,
    DormDetailPage,
    AccountPage,
    SortPage,
    FilterPage,
    DormPage,
    AddChatPage,
    ChatPrivatePage,
    ChatsPage,
    ChatsDormPage,
    DormChatPrivatePage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    CallNumber,
    PhotoLibrary,
    Camera,
    Firebase,
    LoadingController,
    DataProvider,
    AuthProvider,
    AngularFireAuth,
    ChatProvider,
    UserProvider,
    RequestsProvider,
    File,
    FileChooser,
    FilePath,
    ImghandlerProvider,
    DormProvider
  ]
})
export class AppModule {}
