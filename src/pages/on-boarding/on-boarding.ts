import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";

import { Home} from '../home/home';
import {UserObj,
  UserService,
  GENDER_LIST,
  AGE_GROUPS,
  FIT_LEVELS,
  //
  FITNESS_GOALS,
  CAST_OPT,
} from '../../services/user.service';

/*
  Generated class for the OnBoarding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html'
})
export class OnBoardingPage {
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
  }
  @ViewChild('signupSlider') signupSlider: any;
  build_user: UserObj = new UserObj();

  genderList = GENDER_LIST;
  toggledGender: number;
  toggleGenderButton(idx) {
    this.toggledGender = idx;
  }

  ageGroupsList = AGE_GROUPS;
  toggledAge: number;
  toggleAgeButton(idx) {
    this.toggledAge = idx;
  }

  fitLevelsList = FIT_LEVELS;
  toggledFitLvl: number;
  toggleLevelButton(idx) {
    this.toggledFitLvl = idx;
  }

  fitGoalsList = FITNESS_GOALS;
  toggledGoals: number[] = [];
  toggleGoalButton(idx){
    var i = this.toggledGoals.indexOf(idx)
    if(i == -1) this.toggledGoals.push(idx);
    else this.toggledGoals.splice(i,1);

  }

  castOptsList = CAST_OPT;
  toggledCast: number;
  toggleCastButton(idx) {
    this.toggledCast = idx;
  }
  submitAttemmpt: boolean = false;

  onboardingForm: FormGroup;
  public submitted: boolean;


  next() {
    this.signupSlider.slideNext();
  }
  prev() {
    this.signupSlider.slidePrev();
  }
  initializeForm() {

  }



  onSubmit() {

  }


}
