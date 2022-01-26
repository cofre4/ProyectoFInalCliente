import { IPageContrata } from '../model/contrata-interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';


import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import { IContrata, IContrataToSend } from '../model/contrata-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContrataService {

  constructor(private http: HttpClient) { }

  sURL = API_URL + '/contrata';

  getPage(rpp: number, page: number, filter: string, order: string, direction: string, factura: number, servicio: number): Observable<IPageContrata> {
    page--;
    let strOrderUrl: string = "";
    if (filter) {
      strOrderUrl += "&filter=" + filter;
    }
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if(factura){
      strOrderUrl += "&factura=" + factura;
    }
    if(servicio){
      strOrderUrl += "&servicio=" + servicio;
    }
    console.log(this.sURL + "?page=" + page + "&size=" + rpp + strOrderUrl, httpOptions);
    return this.http.get<IPageContrata>(this.sURL + "?page=" + page + "&size=" + rpp + strOrderUrl, httpOptions);
  }
  

  new(oContrata: IContrataToSend): Observable<number> {
    return this.http.post<number>(this.sURL, oContrata, httpOptions);
  }

  get(id: number): Observable<IContrata> {
    return this.http.get<IContrata>(this.sURL + "/" + id, httpOptions);
  }

  update(oContrataToSend: IContrataToSend): Observable<number> {
    return this.http.put<number>(this.sURL, oContrataToSend, httpOptions);
  }
  remove(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
  }

}