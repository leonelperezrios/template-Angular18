import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {StorageService} from "@services";

@Injectable({
    providedIn: 'root'
})
export class WebRequestService {

    URLBASE: string = environment.URLAPI;

    constructor(
        private http: HttpClient,
        private storageService: StorageService
    ) {
    }

    postWithoutToken(url: string, payload: any, headers?: any): Observable<any> {
        return this.http.post<any>(`${this.URLBASE}/${url}`, payload, {
            headers: new HttpHeaders({
                ...headers,
            }),
        });
    }

    getWithHeaders(url: string, params?: any, headers?: any, otherOptions?: any): Observable<any> {
        return this.http.get<any>(`${this.URLBASE}/${url}`, {
            ...(otherOptions ?? {}),
            params: params,
            headers: new HttpHeaders({
                ...headers,
                Authorization: `Bearer ${this.storageService.getToken()}`,
            }),
        });
    }

    postWithHeaders(url: string, payload: any, params?: any, headers?: any): Observable<any> {
        return this.http.post<any>(`${this.URLBASE}/${url}`, payload, {
            params: params,
            headers: new HttpHeaders({
                ...headers,
                Authorization: `Bearer ${this.storageService.getToken()}`,
            }),
        });
    }

    putWithHeaders(url: string, payload: any, params?: any, headers?: any): Observable<any> {
        return this.http.put<any>(`${this.URLBASE}/${url}`, payload, {
            params: params,
            headers: new HttpHeaders({
                ...headers,
                Authorization: `Bearer ${this.storageService.getToken()}`,
            }),
        });
    }

    deleteWithHeaders(url: string, params?: any, body?: any, headers?: any): Observable<any> {
        return this.http.delete<any>(`${this.URLBASE}/${url}`, {
            params: params,
            body: body,
            headers: new HttpHeaders({
                ...headers,
                Authorization: `Bearer ${this.storageService.getToken()}`,
            }),
        });
    }

}
