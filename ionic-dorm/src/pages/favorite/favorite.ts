import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data' ;
import { DormDetailPage } from '../dorm-detail/dorm-detail';
import { AuthProvider } from '../../providers/auth/auth' ;
import { AccountPage } from '../account/account' 
import { usercreds } from '../../models/interfaces/usercreds';
import { RegisterPage } from '../register/register'


@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavPage {
  credentials = {} as usercreds;

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public provider: DataProvider,
            public alertCtrl: AlertController,
            public authProvider: AuthProvider){
  	
  }

  dormTapped(event, dorm) {
    this.navCtrl.push(DormDetailPage, dorm);
  }

  goToAccount() {
    this.navCtrl.push(AccountPage);
  }

  login(){
    if (this.authProvider.user == null) {
      let alert = this.alertCtrl.create({
        title: 'Login',
        inputs: [
          {
            name: 'email',
            placeholder: 'Email'
          },
          {
            name: 'password',
            placeholder: 'Password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Register',
            handler: data => {
              this.navCtrl.push(RegisterPage);
            }
          },
          {
            text: 'Login',
            handler: data => {
              this.credentials.email = data.email;
              this.credentials.password = data.password;
              this.authProvider.login(this.credentials)
            }
          }
        ]
      });
      alert.present();
    } 
  }

}
