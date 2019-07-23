import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrapperService {

  public countrySource = new BehaviorSubject('Barrio Prueba');
  public finishedScrapping = new BehaviorSubject('working');

  constructor(private http: HttpClient) {
  }

  public setCountry(c: any): void {
    this.countrySource.next(c.name);

    this.http.post('/api/country', c.url).toPromise().then((res) => {
      console.log(res);
      this.finishedScrapping.next('finished');
    }).catch((err) => {
      console.log(err);
    });
  }

  public setHouse(c: any): Promise<any> {
    return this.http.post('/api/house', c).toPromise();
  }


}
