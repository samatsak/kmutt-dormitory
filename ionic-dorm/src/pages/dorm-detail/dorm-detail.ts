import { ViewChild, Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, Content, Events, ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { DataProvider, Dorm } from '../../providers/data/data'
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { DormProvider } from '../../providers/dorm/dorm';
import { RegisterPage } from '../register/register'
import { usercreds } from '../../models/interfaces/usercreds';
import { DormPage } from '../dorm/dorm' 


/**
 * Generated class for the DormDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dorm-detail',
  templateUrl: 'dorm-detail.html',
})
export class DormDetailPage {
  @ViewChild('content') content: Content;

  rating: any = 0;
  newComment;
  allComments = [];

  isRate: boolean = false
  dorm: any;

  dormDetail: Dorm
  dormitoryName: string;
  coKMUTT: string;
  type: string;
  phone: string;
  email: string;
  webSite: string;
  address: string;
  price: string;
  elecRate: string;
  waterRate: string;
  parking: string;
  wiFi: string;
  securityGuard: string;
  keyCard: string;
  elevator: string;
  furniture: string;
  CCTV: string;
  washingMachine: string;
  comments: string;
  photoLink: string;

  checkFavDorm: boolean = false
  constructor(private callNumber: CallNumber,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public angularfire: AngularFireDatabase,
    public provider: DataProvider,
    public authProvider: AuthProvider,
    public dormProvider: DormProvider,
    public zone: NgZone,
    public events: Events) {

    this.dormDetail = navParams.data
    this.dormitoryName = navParams.get('dormitoryName');
    this.coKMUTT = navParams.get('coKMUTT');
    this.type = navParams.get('type');
    this.phone = navParams.get('phone');
    this.email = navParams.get('email');
    this.webSite = navParams.get('webSite');
    this.address = navParams.get('address');
    this.price = navParams.get('price');
    this.elecRate = navParams.get('elecRate');
    this.waterRate = navParams.get('waterRate');
    this.parking = navParams.get('parking');
    this.wiFi = navParams.get('wiFi');
    this.securityGuard = navParams.get('securityGuard');
    this.keyCard = navParams.get('keyCard');
    this.elevator = navParams.get('elevator');
    this.furniture = navParams.get('furniture');
    this.CCTV = navParams.get('CCTV');
    this.washingMachine = navParams.get('washingMachine');
    this.comments = navParams.get('comments');
    this.photoLink = navParams.get('photoLink');

    this.events.subscribe('newComment', () => {
      this.allComments = [];
      this.zone.run(() => {
        this.allComments = this.dormProvider.comments;
      })
    })

    if (this.authProvider.user != null) {
      if (this.authProvider.user.favDorm != undefined) {
        this.authProvider.user.favDorm.filter(row=>{
          if(row.dormitoryName == this.dormitoryName){
            this.checkFavDorm = true
          }
        })
      }
      this.dormDetail.rate.filter(row => {
        if (row.key == this.authProvider.user.$key) {
          this.isRate = true
          this.rating = row.value
        }
      })
    }
    this.angularfire.list('dorm-data').subscribe(data=>{
      data.filter(row=>{
        if(row.dormitoryName == this.dormitoryName){
          this.dormDetail = row
          this.dorm = row;
          this.dormProvider.initializeComment(row);
        }
      })
    })
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.dormProvider.getDormComment();
  }

  addComment(dorm) {
    if (this.authProvider.user != null) {
      this.dormProvider.addNewComment(this.newComment).then(() => {
        this.newComment = '';
        let alert = this.alertCtrl.create({
          subTitle: 'Comment success',
        });
        alert.present()
        setTimeout(() => alert.dismiss(), 3000);
      })
    } else {
      this.newComment = '';
      let alert = this.alertCtrl.create({
        subTitle: 'Please login',
      });
      alert.present()
      setTimeout(() => alert.dismiss(), 3000);
    }
  }

  addrmFav() {
    if (this.authProvider.user != null) {
      if (this.checkFavDorm) {
        this.checkFavDorm = false;
        for(let i =0;i<this.authProvider.user.favDorm.length;i++){
          if(this.authProvider.user.favDorm[i] == this.dormDetail){
            this.authProvider.user.favDorm.splice(i,1)
          }
        }
      } else {
        this.checkFavDorm = true;
        this.authProvider.user.favDorm.push(this.dormDetail)
      }
      this.angularfire.list('/user-data').update(this.authProvider.user.$key, {
        favDorm: this.authProvider.user.favDorm
      })
    } else {
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
                let credentials = {} as usercreds;
                credentials.email = data.email;
                credentials.password = data.password;
                this.authProvider.login(credentials).then(()=>{
                if(this.authProvider.admin != null){
                  let dormModal = this.modalCtrl.create(DormPage);
                  dormModal.present();
                }
              })
              }
            }
          ]
        });
        alert.present();
      }
    }
  }

  onModelChange($event) {
    if (this.authProvider.user != null) {
      for (let i = 0; i < this.dormDetail.rate.length; i++) {
        if (this.dormDetail.rate[i].key == this.authProvider.user.$key) {
          this.dormDetail.rate.splice(i, 1)
        }
      }
      this.dormDetail.rate.push({ key: this.authProvider.user.$key, value: this.rating })
      this.isRate = true
      let newTotalRate: number = 0
      this.dormDetail.rate.filter(row => {
        newTotalRate = newTotalRate + (+row.value)
      })
      newTotalRate = newTotalRate / (this.dormDetail.rate.length - 1)
      this.dormDetail.totalRate = newTotalRate

      this.angularfire.list('/dorm-data').update(this.dorm.$key, { rate: this.dormDetail.rate, totalRate: newTotalRate })
    } else {
      this.rating = 0
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
                let credentials = {} as usercreds;
                credentials.email = data.email;
                credentials.password = data.password;
                this.authProvider.login(credentials).then(()=>{
                if(this.authProvider.admin != null){
                  let dormModal = this.modalCtrl.create(DormPage);
                  dormModal.present();
                }
              })
              }
            }
          ]
        });
        alert.present();
      }
    }
  }

  callPhone() {
    let call = this.alertCtrl.create({
      title: 'Call?',
      message: this.dormitoryName + ' ' + this.phone,
      buttons: [{
        text: 'Call', handler: () => {
          this.callNumber.callNumber(this.phone, true)
            .then()
            .catch();
        }
      },
      { text: 'Cancel', handler: () => {} }]
    });
    call.present();
  }

}
