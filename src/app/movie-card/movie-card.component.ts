import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
  public snackBar: MatSnackBar,
  public dialog: MatDialog) { }

ngOnInit(): void {
  this.getMovies();
}



/**
* Calls the get movies method on the API.
*/
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * Calls the add favorite movie method on the API.
  * @param id The movie ID
  */
  addFavorite(id: string): void {
    this.fetchApiData.addFavouriteMovie(id).subscribe((result) => {

      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }

  /**
  * Calls the check favorite movie method on the API.
  * @param id The movie ID
  */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavouriteMovie(id);
  }

  /**
  * Calls the delete favorite movie method on the API.
  * @param id The movie ID
  */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavouriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
    });
  }


  /**
  * Opens the universe dialog.
  * @param name The universe name to show on the dialog (title)
  * @param description The universe description to show on the dialog
  */
  openUniverse(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description
      },
      //width: '280px'
    });
  }

  /**
  * Opens the director dialog.
  * @param name The director's name to show on the dialog (title)
  * @param bio The director's biography to show on the dialog
  */
  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio
      },
      //width: '280px'
    });
  }

  /**
  * Opens the movie description dialog.
  * @param description The text to show on the dialog
  */
  openDetails(releaseUs: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: 'Release Date (USA)',
        content: releaseUs
      },
      //width: '280px'
    });
  }
}
