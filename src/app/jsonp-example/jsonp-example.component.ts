import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FlickrResponse, FlickrResponseItem} from "./flickr-model";

@Component({
  templateUrl: 'jsonp-example.component.html',
  styleUrls: ['jsonp-example.component.css']
})
export class JsonpExampleComponent {

  searchResults$: Observable<FlickrResponseItem[]> | undefined;

  constructor(private http: HttpClient) {
  }

  search(query: string) {
    const url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${query}&format=json`;
    this.searchResults$ = this.http.jsonp<FlickrResponse>(url, 'jsoncallback').pipe(map(data => data.items));
  }
}
