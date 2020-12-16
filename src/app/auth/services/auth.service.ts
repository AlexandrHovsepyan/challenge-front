import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignInResponse } from '../models/sign-in-response.interface';

import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

// models
import { ISignInData } from '../models/sign-in-data.interface';
import { ISignUpData } from '../models/sign-up-data.interface';
import { ISignUpResponse } from '../models/sign-up-responce.interface';

@Injectable()
export class AuthService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private readonly http: HttpClient) { }

    public signIn(val: ISignInData): Observable<ISignInResponse> {
        return this.http.post<ISignInResponse>(`${this.baseUrl}/auth/signin`, val);
    }

    public signUp(val: ISignUpData): Observable<ISignUpResponse> {
        return this.http.post<ISignUpResponse>(`${this.baseUrl}/auth/signup`, val);
    }

}
