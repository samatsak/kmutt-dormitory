import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Dorm {

  dormitoryName: string	;
  distance:string
  rate: any  ;
  coKMUTT: string	;
  type: string	;
  phone: string	;
  email: string	;
  webSite: string	;
  address: string	;
  price: string	;
  elecRate: string	;
  waterRate : string;	
  parking: string	;
  wiFi: string	;
  securityGuard: string	;
  keyCard: string	;
  elevator: string	;
  furniture: string	;
  CCTV: string	;
  washingMachine: string	;
  comments: string	;
  photoLink: string ;
  totalRate: number ;
}

export class User{
  $key:any;
  displayName: string ;
  firstName: string ;
  lastName: string ;
  gender: string ;
  birthDate: Date ;
  phone: string ;
  email: string ;
  password:string
  favDorm:Array<Dorm>;
}

export class Admin{
  $key:any;
  dorm:Dorm
  username:string
  password:string
}

@Injectable()
export class DataProvider {

  user:User
  account:Array<any>

  constructor(public angularfire: AngularFireDatabase,
              public http: Http,
              public alertCtrl: AlertController,
    public authProvider: AuthProvider) {
    this.angularfire.list('/user-data').subscribe(data=>{
      this.account = data
    })
  }

  updateAccount(key:any,value:any){
  	this.angularfire.list('/user-data').update(key,{
        displayName: value.displayName ,
        firstName: value.firstName ,
        lastName: value.lastName ,
        gender: value.gender ,
        birthDate: value.birthDate ,
        phone: value.phone
      })
  }

  setAccount(data:User){
    this.user = data
  }

}
