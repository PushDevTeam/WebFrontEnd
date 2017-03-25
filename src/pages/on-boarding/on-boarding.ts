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
        Validators.compose(
          [
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z ]*'),
            Validators.required])
          ],

        email: [''],
        username: [''],
        password: [''],
        confirm_pword: ['']
      });
  }
  @ViewChild('signupSlider') signupSlider: any;
  build_user: UserObj = new UserObj();

  genderList = GENDER_LIST;
  toggledGender: number;
  toggleGenderButton(idx) { this.toggledGender = idx; }

  ageGroupsList = AGE_GROUPS;
  toggledAge: number;
  toggleAgeButton(idx) { this.toggledAge = idx; }

  fitLevelsList = FIT_LEVELS;
  toggledFitLvl: number;
  toggleLevelButton(idx) { this.toggledFitLvl = idx; }

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
  toggleCastButton(idx) { this.toggledCast = idx; }


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
    alert("validate()");
    console.log(GENDER_LIST[this.toggledGender]);
    console.log(AGE_GROUPS[this.toggledAge]);
    console.log(FIT_LEVELS[this.toggledFitLvl]);
    console.log(this.toggledGoals);
    console.log(CAST_OPT[this.toggledCast]);
    this.navCtrl.push(Home);
  }


}
