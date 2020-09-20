import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQDGg1X14eX8Sy8J1cYmnzp8C9eCzGBNVNBuUy6M8EXb5sqyMjXx8M0i5aEKnrxedfdX1w-yQ00EAWpYwUw'
    });
    return this.http.get( url, {headers} );
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases')
                .pipe( map(data => {
                  return data['albums'].items;
                }));

  }

  getArtistas( termino: string ){

    return this.getQuery(`search?query=${ termino }&type=artist&offset=0&limit=15`)
              .pipe (map(data => data['artists'].items ));

  }

  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
              //.pipe (map(data => data['artists'].items ));

  }
}
