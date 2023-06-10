import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user: any = {};
  favouriteMovies: any[] = [];

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
  * Gets the user info and favorite movies from the API.
  */
  getUser(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.username = this.user.username;
    this.userData.email = this.user.email;
    this.userData.birthday = formatDate(this.user.birthday, 'yyyy-MM-dd', 'en-GB', 'UTC+1');

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favouriteMovies = resp.filter((m: { _id: any; }) => this.user.favouriteMovies.indexOf(m._id) >= 0);
    });
  }
  
  /**
  * Edit user details via the API.
  */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));

      this.snackBar.open('User successfully updated!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   *Delete a user via the API.
   */ 
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((response) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('User successfully deleted!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
