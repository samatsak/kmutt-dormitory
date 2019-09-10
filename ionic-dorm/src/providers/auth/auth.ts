import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';
import { AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { User , Dorm} from '../data/data';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  account: Array<any>
  adminAccount: Array<any>

  user: User;
  admin: Dorm
  dorm

  constructor(public angularfire: AngularFireDatabase, 
    public loadingCtrl: LoadingController,
    public afireauth: AngularFireAuth,
    public alertCtrl: AlertController) {
    this.angularfire.list('/user-data').subscribe(data => {
      this.account = data
    })
    this.angularfire.list('/admin-data').subscribe(data => {
      this.adminAccount = data
    })
    this.angularfire.list('/dorm-data').subscribe(data=>{
      this.dorm = data
    })
  }

  login(credentials: usercreds) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((Success) => {
        this.account.filter(row => {
          if (row.uid == this.afireauth.auth.currentUser.uid) {
            this.user = row;
          }
        });
        this.adminAccount.filter(row=>{
          if(row.uid == this.afireauth.auth.currentUser.uid){
            this.dorm.filter(data=>{
              if(data.dormitoryName == row.username){
                this.admin = data
              }
            })
          }
        })
        loading.dismiss();
        let alert = this.alertCtrl.create({
          subTitle: 'Login success',
        });
        alert.present()
        setTimeout(() => alert.dismiss(), 3000);
        resolve(true);
      }).catch((err) => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          subTitle: 'Invalid Username or Password.',
        });
        alert.present()
        setTimeout(() => alert.dismiss(), 3000);
      })
    })
    return promise;
  }

  logout() {
    this.user = null
    this.admin = null
    let alert = this.alertCtrl.create({
      subTitle: 'Logout success.',
      buttons: ['OK']
    });
    alert.present();
    setTimeout(() => alert.dismiss(), 3000);
  }
}
