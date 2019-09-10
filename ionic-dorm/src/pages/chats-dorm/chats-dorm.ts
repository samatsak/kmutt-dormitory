import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { RequestsProvider } from '../../providers/requests/requests';
import { DormChatPrivatePage } from '../dorm-chat-private/dorm-chat-private';

/**
 * Generated class for the ChatsDormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chats-dorm',
  templateUrl: 'chats-dorm.html',
})
export class ChatsDormPage {

  myfriends;
  myDorm;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider) {
  }


  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.requestservice.getMyDorm();
    this.myfriends = [];
    this.myDorm = [];
    this.events.subscribe('admin-data', () => {
      this.myDorm = [];
      this.myDorm = this.requestservice.myDorm;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('friends');
    this.events.unsubscribe('admin-data');

  }

  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push(DormChatPrivatePage);
  }

}
