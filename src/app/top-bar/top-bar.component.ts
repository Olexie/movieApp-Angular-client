import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
 
export class TopBarComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }


  /**
  * Clear saved tokens to logout from the app.
  */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
