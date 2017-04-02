import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailObj } from './email';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, FormArray } from "@angular/forms";
/*
  Generated class for the ContactUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html'
})
export class ContactUsPage {
private email: EmailObj;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  ngOnInit(){
    this.email.toEmail = "natasha@pushdaily.fit";
    //this.email.subject = "Feedback for Push";
  }

sendEmail() {

}

}
