import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { DataProvider, User, Dorm } from '../../providers/data/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  accountForm: FormGroup;
  rePassword = ''

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public dataProvider: DataProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public angularfire: AngularFireDatabase, 
    public userservice: UserProvider,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public photoLibrary: PhotoLibrary, 
    public toastCtrl: ToastController) {

    this.accountForm = this.formBuilder.group({
      displayName: ['',Validators.required],
      firstname: [''],
      lastname: [''],
      gender: [''],
      birthDate: [''],
      phone: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
  }

  ionViewDidLoad() {
  }


  validate(): boolean {
    if (this.accountForm.valid) {
      return true;
    }

    let controlDisplayName = this.accountForm.controls['displayName']
    let controlEmail = this.accountForm.controls['email'];
    let controlPassword = this.accountForm.controls['password'];

    let errorDisplayName
    let errorEmail
    let errorPassword

    if(controlDisplayName.invalid){
      errorDisplayName = 'Please provide a Display Name.'
    }

    if (controlEmail.invalid) {
      if (controlEmail.errors['required'] && controlEmail.errors['email']) {
        errorEmail = 'Please provide a email.';
      }
    }

    if (controlPassword.invalid) {
      errorPassword = 'Please provide a password at least 6 characters.';
    }

    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: errorEmail || errorPassword || 'Empty error message!',
      buttons: ['OK']
    });
    alert.present();

    return false;
  }

  register() {
    if (this.validate()) {
      if (this.rePassword != this.accountForm.value.password) {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please provide a re-password.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        let dorm: Array<Dorm> = [{
          dormitoryName: '',
          distance:'',
          coKMUTT: '',
          rate: [{key:'',value:''}],
          type: '',
          phone: '',
          email: '',
          webSite: '',
          address: '',
          price: '',
          elecRate: '',
          waterRate: '',
          parking: '',
          wiFi: '',
          securityGuard: '',
          keyCard: '',
          elevator: '',
          furniture: '',
          CCTV: '',
          washingMachine: '',
          comments: '',
          photoLink: '',
          totalRate: 0 
        }]
        let user: User = {
          $key: '',
          displayName: this.accountForm.value.displayName,
          firstName: this.accountForm.value.firstname,
          lastName: this.accountForm.value.lastname,
          gender: this.accountForm.value.gender,
          birthDate: this.accountForm.value.birthDate,
          phone: this.accountForm.value.phone,
          email: this.accountForm.value.email,
          password: this.accountForm.value.password,
          favDorm: dorm
        }

        let loader = this.loadingCtrl.create({
          content: 'Please wait'
        });
        loader.present();
        this.userservice.adduser(user).then((res: any) => {
          loader.dismiss();
        })

        this.navCtrl.pop();
      }
    }
  }

}