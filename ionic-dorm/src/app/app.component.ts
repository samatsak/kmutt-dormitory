import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  loader: any ;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.presentLoading();

    storage.get('tutorialShown').then((result)=>{
      if(result){
        this.rootPage = TabsPage ;
      } else{
        this.rootPage = TutorialPage ;
        storage.set('tutorialShown', true);
      }
      this.loader.dismiss();
    })
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Waiting.. ."
    });
    this.loader.present();
  }

}
