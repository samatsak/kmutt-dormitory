import { Injectable } from '@angular/core';
import { Events, AlertController } from 'ionic-angular';
import { UserProvider } from '../user/user';
import firebase from 'firebase';

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  fireadmin = firebase.database().ref('/admin-data');

  userdetails;
  myfriends;
  myDorm;

  constructor(public userservice: UserProvider,
    public events: Events,
    public alertCtrl: AlertController) {

  }

  acceptrequest(buddy) {
    
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(buddy).push({
        uid: firebase.auth().currentUser.uid
      }).then(() => {
        this.firefriends.child(firebase.auth().currentUser.uid).push({
          uid: buddy
        })
        let newalert = this.alertCtrl.create({
          title: 'Dormitory added',
          subTitle: 'Tap on the domitory to chat.',
          buttons: ['OK']
        });
        newalert.present();
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;
  }

  getmyfriends() {
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);

      this.userservice.getUsers().then((users) => {
        this.myfriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].uid) {
              this.myfriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }

  getMyDorm() {
    let dormuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allDorm = snapshot.val();
      this.myDorm = [];
      for (var i in allDorm)
        dormuid.push(allDorm[i].uid);

      this.userservice.getallusers().then((users) => {
        this.myDorm = [];
        for (var j in dormuid)
          for (var key in users) {
            if (dormuid[j] === users[key].uid) {
              this.myDorm.push(users[key]);
            }
          }
        this.events.publish('admin-data');
      }).catch((err) => {
        alert(err);
      })

    })
  }

}
