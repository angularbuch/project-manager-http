import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: 'jsonp-example.component.html',
  styleUrls: ['jsonp-example.component.css']
})
export class JsonpExampleComponent {

  searchResults$: Observable<any[]> | undefined;

  constructor(private http: HttpClient) {
  }

  search(query: string) {
    const url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${query}&format=json`;
    this.searchResults$ = this.http.jsonp<any>(url, 'jsoncallback').pipe(map(data => data.items));
  }
}
