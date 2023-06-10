import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

/**
* Opens the dialog for user signup
*/
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
    });
}

/**
* Opens the login dialog.
*/
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
  // Assigning the dialog a width
    width: '280px'
    });
}

}
