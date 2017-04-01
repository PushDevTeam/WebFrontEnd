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
import {SignInPage} from '../sign-in/sign-in';
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

  }
  @ViewChild('onboardSlider') onboardSlider: any;
  build_user: UserObj = new UserObj();
  

  confirm_pword: string;

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
    return (
      (this.build_user.password == this.confirm_pword)
      && (this.build_user.password != '')
      && (this.confirm_pword != ''));
  }
  alreadyHave(){
    this.navCtrl.push(SignInPage);
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

    // authorize form data
    // create user and store
    this.navCtrl.setRoot(Home);
  }

  facebookSignIn(){
    let new_user = new UserObj();
    new_user.gender = this.toggledGender;
    new_user.ageGroup = this.toggledAge;
    new_user.level = this.toggledFitLvl;
    new_user.goals = this.toggledGoals;
    //TODO
    //handle facebook auth stuff
  }


  goBack() {
    this.navCtrl.pop();
  }

}
