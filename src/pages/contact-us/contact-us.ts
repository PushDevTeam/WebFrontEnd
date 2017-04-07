import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailObj } from './email';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UserService} from '../../services/user.service';
import { Home } from '../home/home';

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
private email = new EmailObj();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService) {}


  ngOnInit(){
    this.email.toEmail = "natasha@pushdaily.fit";
    this.email.subject = "Feedback for Push";
    this.email.fromEmail = this.userService.getEmail();
  }

sendEmail() {

  this.navCtrl.setRoot(Home);
}

onCancel() {
  this.navCtrl.setRoot(Home);
}

}
