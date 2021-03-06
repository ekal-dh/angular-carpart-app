import {Injectable} from '@angular/core';
import {CARPARTS} from './mocks';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {promise} from 'selenium-webdriver';
import Promise = promise.Promise;
import {CarPart} from './carpart';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable(/*{
  providedIn: 'root'
}*/)
export class CarpartsDataService {
  constructor(private httpClient: HttpClient) {
    console.log('CarpartsDataService constructor called..');
  }

  getCarParts(): Observable<any> {
    // Json File under the Assets
    return this.httpClient.get('assets/carpart.json', {responseType: 'json'});
    // return CARPARTS;
  }

  getCarPartsPromise(): Promise<CarPart[]> {
    // return this.httpClient.get('assets/carpart.json')
    return this.httpClient.get('http://127.0.0.1:52274/data.json')
      .toPromise()
      .then(res => res['data'])
      .catch(err => console.log('Error occured', err));
  }

  addCarPart(carPart: CarPart): Observable<CarPart> {
    carPart.id = carPart.id; // number casting
    return this.httpClient.post<CarPart>('http://127.0.0.1:52274/products', carPart) ;
  }
}
