import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import { DormDetailPage } from '../dorm-detail/dorm-detail';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SortPage } from '../sort/sort'
import { FilterPage } from '../filter/filter'
import { AccountPage } from '../account/account';
import { RegisterPage } from '../register/register'
import { UserProvider } from '../../providers/user/user';
import { DormPage } from '../dorm/dorm' 

import { ChatsPage } from '../chats/chats';
import { ChatsDormPage } from '../chats-dorm/chats-dorm';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';



import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  credentials = {} as usercreds;
  dormList: Array<any> = [];
  userData: Array<any> = [];

  filteredDorm: Array<any> = [];
  isfiltered: boolean;
  isAdmin: boolean = true;
  displayName: string;
  uid: string;

  isFav: boolean = false;
  tasks: FirebaseListObservable<any[]>;

  constructor(public userservice: UserProvider,
    public modalCtrl: ModalController,
    public angularfire: AngularFireDatabase,
    public http: Http,
    public provider: DataProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authservice: AuthProvider) {

    this.isfiltered = false;
    this.tasks = angularfire.list('/dorm-data');

  }

  favButton(event, dorm) {
    this.isFav = !this.isFav;
  }

  login() {
    if (this.authservice.user == null) {
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
              this.authservice.login(this.credentials).then(()=>{
                if(this.authservice.admin != null){
                  //let dormModal = this.modalCtrl.create(DormPage);
                  //dormModal.present();
                  this.navCtrl.setRoot(DormPage);
                }
              })
            }
          }
        ]
      });
      alert.present();
    }
  }

  goToAccount() {
    this.navCtrl.push(AccountPage);
  }

  goChat() {
    this.uid = this.userservice.getUID();
    if (this.authservice.user != null) {
      let checkUser = true
      this.angularfire.list('/user-data').subscribe(data => {
        data.filter(row => {
          if (row.uid == this.uid) {
            this.goToChat();
            checkUser = false
          }
        });
      })
      if (checkUser) {
        this.goToChatDorm();
      }
    } else {

      let alert = this.alertCtrl.create({
        title: 'Please Login.',
        buttons: ['OK']

      });
      alert.present();
    }
  }

  goToChat() {
    this.navCtrl.push(ChatsPage);
  }

  goToChatDorm() {
    this.navCtrl.push(ChatsDormPage);
  }

  searchDorm(event) {
    if (this.isfiltered && this.filteredDorm != null) {
      this.dormList = this.filteredDorm
    } else {
      this.angularfire.list('/dorm-data').subscribe(data => {
        this.dormList = data;
      }
      );
    }

    if (event.target.value) {
      if (event.target.value.length > 0) {

        let filteredJson = this.dormList.filter((row) => {
          if (row.dormitoryName.toLowerCase().indexOf((event.target.value.toLowerCase())) > -1) {
            return true;
          }
          return false;
        })

        this.isfiltered = true;
        this.filteredDorm = filteredJson;
      } else {
        this.isfiltered = false;
      }
    } else {
      this.isfiltered = false;
    }
  }

  dormTapped(event, dorm) {
    this.navCtrl.push(DormDetailPage, dorm);
  }

  sort() {
    let profileModal
    if(this.isfiltered){
      profileModal = this.modalCtrl.create(SortPage, this.filteredDorm);
        profileModal.onDidDismiss(data => {
        this.isfiltered = true;
        this.filteredDorm = data
      });
    }else{
      let listDorm 
      this.tasks.subscribe(data=>{
        listDorm = data
      })
      profileModal = this.modalCtrl.create(SortPage, listDorm);
        profileModal.onDidDismiss(data => {
        this.isfiltered = true;
        this.filteredDorm = data
      });
    }
    profileModal.present();
  }

  filter() {
    let listDorm 
    this.tasks.subscribe(data=>{
      listDorm = data
    })
    let profileModal = this.modalCtrl.create(FilterPage, listDorm);
      profileModal.onDidDismiss(data => {
      this.isfiltered = true;
      this.filteredDorm = data
    });
    profileModal.present();
  }

  clear(){
    this.filteredDorm = [];
    this.isfiltered = false 
  }
}
