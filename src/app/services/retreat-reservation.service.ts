import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import GlobalService from './globalService';
import { environment } from '../../environments/environment';
import {Retreat} from '../models/retreat';
import {RetreatReservation} from '../models/retreatReservation';
import {Organization} from '../models/organization';

@Injectable()
export class RetreatReservationService extends GlobalService {

  url_retreat_reservation = environment.url_base_api + environment.paths_api.retreatReservations;

  constructor(public http: HttpClient) {
    super();
  }

  list(filters: {name: string, value: any}[] = null, limit = 100, offset = 0): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    params = params.set('limit', limit.toString());
    params = params.set('offset', offset.toString());
    if (filters != null) {
      for (const filter of filters) {
        if (filter.name === 'user') {
          params = params.set('user', filter.value);
        } else if (filter.name === 'retreat') {
          params = params.set('retreat', filter.value);
        } else if (filter.name === 'is_active') {
          params = params.set('is_active', filter.value);
        } else if (filter.name === 'retreat__type__is_virtual') {
          params = params.set('retreat__type__is_virtual', filter.value);
        }
      }
    }
    return this.http.get<any>(
      this.url_retreat_reservation,
      {headers: headers, params: params}
    );
  }

  create(retreatReservation: RetreatReservation): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_retreat_reservation,
      retreatReservation,
      {headers: headers}
    );
  }

  remove(retreatReservation: RetreatReservation, data = {}): Observable<any> {
    const headers = this.getHeaders();

    return this.http.request<any>(
      'delete',
      retreatReservation.url,
      {
        body: data,
        headers: headers
      }
    );
  }

  update(url: string, retreatReservation: RetreatReservation): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch<any>(
      url,
      retreatReservation,
      {headers: headers}
    );
  }
}
