import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { OnBoardingPage } from "../on-boarding/on-boarding";
import { SignInPage } from "../sign-in/sign-in";

/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  onSignUp() {
    this.navCtrl.push(OnBoardingPage);
  }

  onSignIn() {
    this.navCtrl.push(SignInPage, {mode: 'IN'});
  }

}
