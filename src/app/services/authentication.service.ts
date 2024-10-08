import {Injectable} from '@angular/core';
import {WebRequestService} from "./web-request.service";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    pathAuth: string = '/auth/authentication';

    private loguedPerson_: BehaviorSubject<any> = new BehaviorSubject(null);

    loguedPerson$: Observable<any> = this.loguedPerson_.asObservable();

    constructor(
        private webRequestService: WebRequestService
    ) {
    }

    login(payload: { username: string; password: string }, tenant?: string): Observable<any> {
        tenant = tenant ? tenant : "tenant_001";
        const headers = {"X-Tenant-Id": tenant};
        return this.webRequestService.postWithoutToken(
            this.pathAuth,
            payload,
            headers
        ).pipe(
            map(e => {
                this.loguedPerson_.next(e.persona);
                return e;
            })
        );
    }
}
