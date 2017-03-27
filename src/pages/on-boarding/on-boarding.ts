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
  EXERCISES_TYPES,
  FITNESS_GOALS,
  CAST_OPT,
} from '../../services/user.service';

/*
  Generated class for the OnBoarding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//usernames can consist of lowercase and capitals alpha numeric
// hyphens, underscores, spaces are ok but not two in row or at start/end
const USERNAME_REGEX = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;

@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html'
})
export class OnBoardingPage {
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {


      this.onboardingForm = formBuilder.group({
        // contain only letters and spaces, max length 50
        full_name: ['',
        Validators.compose([
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z ]*'),
            Validators.required
          ])],

        email: ['',
        Validators.compose([
          Validators.maxLength(40),
          Validators.pattern(EMAIL_REGEX),
          Validators.required
        ])],
        username: ['',
        Validators.compose([
          Validators.maxLength(40),
          Validators.pattern(USERNAME_REGEX),
          Validators.required
        ])],
        password: [''],
        confirm_pword: ['']
      });
  }
  @ViewChild('onboardSlider') onboardSlider: any;
  build_user: UserObj = new UserObj();

  genderList = GENDER_LIST;
  toggledGender: number;
  genderError = false;
  toggleGenderButton(idx) {
    this.toggledGender = idx;
    this.genderError = false;
   }


  ageGroupsList = AGE_GROUPS;
  toggledAge: number;
  ageError = false;
  toggleAgeButton(idx) {
    this.toggledAge = idx;
    this.ageError = false;
   }


  fitLevelsList = FIT_LEVELS;
  toggledFitLvl: number;
  levelError = false;
  toggleLevelButton(idx) {
    this.toggledFitLvl = idx;
    this.levelError = false;
   }


  exercisesList = EXERCISES_TYPES;
  toggledExercises: number[] = [];
  toggleExerciseButton(idx){
    var i = this.toggledExercises.indexOf(idx);
    if(i < 0) this.toggledExercises.push(idx);
    else this.toggledExercises.splice(i,1);
  }

  fitGoalsList = FITNESS_GOALS;
  toggledGoals: number[] = [];
  toggleGoalButton(idx){
    var i = this.toggledGoals.indexOf(idx)
    if(i < 0) this.toggledGoals.push(idx);
    else this.toggledGoals.splice(i,1);
  }


  castOptsList = CAST_OPT;
  toggledCast: number;
  castError = false;
  toggleCastButton(idx) {
    this.toggledCast = idx;
    this.castError = false;
  }

  submitAttemmpt: boolean = false;

  onboardingForm: FormGroup;
  public submitted: boolean;



  passwordsMatch(){
    return this.onboardingForm.controls['password'].value == this.onboardingForm.controls['confirm_pword'].value;
  }


  onSubmit() {
    alert("validate()");
    if(this.toggledGender == undefined) this.genderError = true;
    if(this.toggledAge == undefined) this.ageError = true;
    if(this.toggledFitLvl == undefined) this.levelError = true;
    if(this.toggledCast == undefined) this.castError = true;

    if(this.genderError) {
      this.onboardSlider.slideTo(1);
      return false;
    }
    if(this.ageError == undefined) {
      this.onboardSlider.slideTo(2);
      return false;
    }
    if(this.levelError == undefined) {
      this.onboardSlider.slideTo(3);
      return false;
    }
    if(this.castError == undefined) {
      this.onboardSlider.slideTo(6);
      return false;
    }

    console.log(GENDER_LIST[this.toggledGender]);
    console.log(AGE_GROUPS[this.toggledAge]);
    console.log(FIT_LEVELS[this.toggledFitLvl]);
    console.log(this.toggledGoals);
    console.log(CAST_OPT[this.toggledCast]);
    this.navCtrl.push(Home);
  }


}
