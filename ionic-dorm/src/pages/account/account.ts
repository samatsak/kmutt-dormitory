import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, AlertController   } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user'
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs'


/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  accountForm: FormGroup
  typePassword:string = 'password'
  selectedPhoto;
  loading;
  currentImage;

  constructor( 
    public navCtrl: NavController,
    public provider: DataProvider, 
    public formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    public camera: Camera,
    public afireauth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public userProvider:UserProvider,
    public authProvider: AuthProvider) {
      if(this.authProvider.user != undefined){
        this.accountForm = this.formBuilder.group({
        displayName: [this.authProvider.user.displayName],
        firstname: [this.authProvider.user.firstName],
        lastname: [this.authProvider.user.lastName],
        gender: [this.authProvider.user.gender],
        birthDate: [this.authProvider.user.birthDate],
        phone: [this.authProvider.user.phone]      
      })
        //this.currentImage = this.afireauth.auth.currentUser.photoURL
        this.currentImage = firebase.auth().currentUser.photoURL
        console.log("currentImage"+this.currentImage);
      }
  }

  togglePassword(){
    if(this.typePassword == 'text'){
      this.typePassword = 'password'
    }else{
      this.typePassword = 'text'
    }
  }

  editProfile(){
    let value = {
      $key:'',
      displayName: this.accountForm.value.displayName ,
      firstName: this.accountForm.value.firstname ,
      lastName: this.accountForm.value.lastname ,
      gender: this.accountForm.value.gender ,
      birthDate: this.accountForm.value.birthDate ,
      phone: this.accountForm.value.phone
    }
    this.provider.updateAccount(this.authProvider.user.$key,value)
    this.userProvider.updateimage(this.currentImage);
    let alert = this.alertCtrl.create({
      subTitle: 'Edit Profile success.',
    });
    alert.present()
    setTimeout(()=>alert.dismiss(),3000);
  }

  supportLogout(){
    this.authProvider.logout()
    this.navCtrl.setRoot(TabsPage)
  }

  uploadProfilePic() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose photo',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.grabPicture()
            this.userProvider.updateimage(this.currentImage)
          }
        },
        {
          text: 'From Library',
          handler: () => {
            this.albumPicture()
            this.userProvider.updateimage(this.currentImage)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  grabPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

      this.camera.getPicture(options).then((imageData) => {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

      this.upload();

    }, (err) => {
    });
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  upload() {
    if (this.selectedPhoto) {
      var uploadTask = firebase.storage().ref().child(this.afireauth.auth.currentUser.email+'/uploaded.png').put(this.selectedPhoto);
      uploadTask.then(this.onSuccess, this.onError);
    }
  }

  onSuccess = (snapshot) => {
    this.currentImage = snapshot.downloadURL;
    this.loading.dismiss();
  }

  onError = (error) => {
    this.loading.dismiss();
  }

  albumPicture(){
    let options:CameraOptions = {
    destinationType   : this.camera.DestinationType.DATA_URL,
    sourceType        : this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

      this.upload();

    }, (err) => {
    });
  }

}
