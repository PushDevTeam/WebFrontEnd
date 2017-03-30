import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import { NgForm } from "@angular/forms";

/*
TODO:  review what information we want on users
*/
export const GENDER_LIST : string[] = [
  'Male','Female','Another identity','Prefer not to say'];
export const AGE_GROUPS: string[] = [
  '18 to 25', '26 to 35', '36 to 45', '46 to 55', '55+'
];
export const FIT_LEVELS: string[] = [
  'Beginner',
  'Intermediate',
  'Advanced'
];
export const FITNESS_GOALS = [
  'Lose weight',
  'Strengthen',
  'Build muscle',
  'Lose baby weight',
  'Dance your ass off'
];
export const CAST_OPT = ['AppleTV', 'Chromecast', 'Roku', 'None'];
export const EXERCISES_TYPES =
  [
    '1','2','3','4','5','6','7','8','9','10',
  ];

export class UserObj {
  public id: number;
  public username: string;
  public password: string;
  public email: string;
  public gender?: number;
  public ageGroup?: number;
  public level?: number;
  public goals?: number[];

  public profileimgurl?: string;
  

}
/*
root module should be the ONLY provider of this service
in order to keep it a singleton

so don't add this to any providers[] arrays of components
*/
@Injectable()
export class UserService {
  private user: UserObj;

  constructor(
    private storageService: StorageService,
  ) {

  }

  public loadStoredUser(): Promise<boolean> {

    return this.getStoredUser().then((user_v) => {
      this.user = JSON.parse(user_v);

      if (this.user === null) {
        return false
      }
      return true;
    }, err => {
      return false;
    });
  }


  public getUsername() { return this.user.username; }
  public getEmail() {
    if(this.user == null) return 'mock_email';
    return this.user.email;
   }

  public getStoredUser() {
    return this.storageService.get('user');
  }

  public storeUser(user: UserObj) {
    return this.storageService.set('user', JSON.stringify(user));
  }
  public createUser(form: NgForm) {
    var save_user = new UserObj();
    save_user.id = 0;
    save_user.email = form.value.email;
    save_user.password = form.value.password;
    save_user.username = "mock_username";
    // only store and set if auth
    this.storeUser(save_user);
    this.user = save_user;
  }
}
