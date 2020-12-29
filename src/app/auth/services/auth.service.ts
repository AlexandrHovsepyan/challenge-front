import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

// models
import { IAuthResponse } from "../models/auth-responce.interface";
import { ISignIn } from "../models/sign-in.interface";
import { ISignUp } from "../models/sign-up.interface";

@Injectable()
export class AuthService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private readonly http: HttpClient) { }

    public signIn(val: ISignIn): Observable<IAuthResponse> {
        return this.http.post<IAuthResponse>(`${this.baseUrl}/auth/signin`, val);
    }

    public signUp(val: ISignUp): Observable<IAuthResponse> {
        return this.http.post<IAuthResponse>(`${this.baseUrl}/auth/signup`, val);
    }

}
