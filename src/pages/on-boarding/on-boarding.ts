import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { NgForm } from "@angular/forms";

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
import { AuthService } from '../../services/auth';
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
    public userService: UserService,
    public authService: AuthService
    ) {

  }
  @ViewChild('onboardSlider') onboardSlider: any;
  build_user: UserObj = new UserObj();
  temp_user: any = {};

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


  public submitted: boolean;



  passwordsMatch(){
    return (
      (this.temp_user.password == this.confirm_pword)
      && (this.temp_user.password != '')
      && (this.confirm_pword != ''));
  }
  alreadyHave(){
    this.navCtrl.push(SignInPage);
  }

  onSubmit() {
    //alert("validate()");
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

    this.build_user.password = this.temp_user.password;
    this.temp_user = {};

    let gender = GENDER_LIST[this.toggledGender];
    let age_group = AGE_GROUPS[this.toggledAge];
    let fit_level = FIT_LEVELS[this.toggledFitLvl];
    let toggled_goals = this.toggledGoals;
    let cast_opt = CAST_OPT[this.toggledCast];
    console.log('gender: \n', gender);
    console.log('age_group: \n', age_group);
    console.log('fit_level: \n', fit_level);
    console.log('toggled_goals: \n', toggled_goals);
    console.log('cast_opt: \n', cast_opt);

    
    this.authService.customAuthSignUp(this.build_user);
    // authorize form data
    // create user and store
    this.userService.storeUser(this.build_user);
    this.navCtrl.setRoot(Home);
  }


  facebookSignUp(){
    this.build_user;
    this.build_user.password = 'facebook';
    //TODO
    //handle facebook auth stuff
    return this.authService.facebookAuth(this.build_user).then((resp)=> console.log(resp));
  }

  buildUser = () =>{
    this.build_user.gender = this.toggledGender;
    this.build_user.ageGroup = this.toggledAge;
    this.build_user.level = this.toggledFitLvl;
    this.build_user.goals = this.toggledGoals;

    //TODO
    // what if fb auth fails
    this.navCtrl.setRoot(Home);
  }


  goBack() {
    this.navCtrl.pop();
  }

}
