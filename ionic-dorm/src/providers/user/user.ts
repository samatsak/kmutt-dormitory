import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/user-data');
  fireDorm = firebase.database().ref('/admin-data');
  fireFriend = firebase.database().ref('/friends');

  dormList: Array<any> = [];
  constructor(public afireauth: AngularFireAuth,
    public alertCtrl: AlertController,
    public angularfire: AngularFireDatabase) {

  }

  /*
  Adds a new user to the system.
  Called from - signup.ts
  Inputs - The new user object containing the email, password and displayName.
  Outputs - Promise.
  
   */

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      let photoURL = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: photoURL
        }).then(() => {
            this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            firstName: newuser.firstName,
            lastName: newuser.lastName,
            gender: newuser.gender,
            birthDate: newuser.birthDate,
            phone: newuser.phone,
            favDorm: newuser.favDorm,            
            photoURL: photoURL
          }).then(() => {
            let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle:'Account was successfully',
            });
            alert.present()
            setTimeout(()=>alert.dismiss(),3000);
            resolve({ success: true })
            })
          })
      }).catch((err) => {
        let alert = this.alertCtrl.create({
        subTitle: newuser.email+' is already a KMUTT Dormitory account. Try anothe name',
        });
        alert.present()
        setTimeout(()=>alert.dismiss(),3000);
        resolve({ success: false })
      })
    })
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/user-data/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        })
      })
    })
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getUID() {
    return firebase.auth().currentUser.uid;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL,
          uid: this.afireauth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.fireDorm.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getAllFriend() {
    this.angularfire.list('/friends/'+firebase.auth().currentUser.uid).subscribe(data => {
      this.dormList = data;
    })
    return this.dormList;
  }

  getUsers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  upload(key, selectedPhoto): string {
    if (selectedPhoto) {
      var uploadTask = firebase.storage().ref().child(key + '/profile.png').put(selectedPhoto);
      let url
      uploadTask.then((snapshot) => {
        url = snapshot.downloadURL;
      })
      return url
    }
  }
}
