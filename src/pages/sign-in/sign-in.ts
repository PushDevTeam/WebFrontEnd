import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';

import { LoadingController, AlertController } from "ionic-angular";
import { AuthService } from "../../services/auth";
import { Home } from "../home/home";
import { OnBoardingPage } from "../on-boarding/on-boarding";

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage implements OnInit {
  mode='Up';


  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private navParams: NavParams) {}


ngOnInit() {
  this.mode = this.navParams.get('mode');
}

goBack() {
  this.navCtrl.pop();
}

onSignin(form: NgForm) {
this.navCtrl.push(Home);
//if this.mode == up || this.mode == in
              //  const loading = this.loadingCtrl.create({
                //  content: 'Signing you in...'
                //});
                //loading.present();
                //this.authService.signIn(form.value.email, form.value.password)
              //    .then(data => {
                //    loading.dismiss();
                //  })
                //  .catch(error => {
                  //  loading.dismiss();
                    //const alert = this.alertCtrl.create({
                      //title: 'Signin failed!',
                      //message: error.message,
                      //buttons: ['Ok']
                    //});
                  //  alert.present();
                //  });
              }
            }
