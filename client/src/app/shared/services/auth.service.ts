import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpClient,
} from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthFlow } from '../enums/auth-flow.enum';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authFlow$ = new BehaviorSubject<AuthFlow>(AuthFlow.Login);

    constructor(
        private router: Router,
        private http: HttpClient,
    ) { }
    login(payload: UserModel): Observable<any> {
        return this.http.post('http://localhost:5000/api/user/login', payload).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
    signUp(payload: UserModel): Observable<any> {
        return this.http.post('http://localhost:5000/api/user/register', payload).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
}
