import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";

import {
  Home
} from '../home/home';

/*
  Generated class for the OnBoarding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html'
})
export class OnBoardingPage implements OnInit {
  locationOptions = [' ', 'AL', 'AK', 'NM', 'WI'];
  sexOptions = ['F', 'M', 'Prefer Not to Answer'];
  goalOptions = ['Get Ripped', 'Beach Body', 'Ass Like Serena'];
  bodyOptions = ['arms', 'legs', 'abs'];

  onboardingForm: FormGroup;
  public submitted: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {

}
ngOnInit() {
  this.initializeForm();

}

initializeForm() {
  let location = 'WI';
  let sex = 'F';
  let goals = 'Ass Like Serena';
  let body = 'arms';

    this.onboardingForm = new FormGroup({
      'location': new FormControl(location, Validators.required),
      'sex': new FormControl(sex, Validators.required),
      'goals': new FormControl(goals, Validators.required),
      'body': new FormControl(body, Validators.required)
    })
  }



  onSubmit() {
    this.submitted = true;
    this.navCtrl.push(Home);
  }


}
