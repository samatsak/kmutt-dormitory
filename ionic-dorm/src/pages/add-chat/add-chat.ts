import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
/**
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-chat',
  templateUrl: 'add-chat.html',
})
export class AddChatPage {
  newrequest = {} as connreq;
  temparr = [];
  checkUser = [];

  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestsProvider) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })

  }

  ionViewDidLoad() {

  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    
    this.checkUser = this.userservice.getAllFriend();
    
    let check : boolean = false ;
    this.checkUser.filter((v) => {   
      if (v.uid == recipient.uid) {
        check = true ;
      }
    })

    if (check) {
      alert('You have this dormitory chat already.');
    } else {
      this.requestservice.acceptrequest(recipient.uid).then(() => {
        let newalert = this.alertCtrl.create({
          title: 'Dormitory added',
          subTitle: 'Tap on the domitory to chat.',
          buttons: ['OK']
        });
        newalert.present();
      })
    }
  }
}



