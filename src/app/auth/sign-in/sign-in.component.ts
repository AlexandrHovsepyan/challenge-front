import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { IAuthResponse } from "../models/auth-responce.interface";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {

    private readonly subscriptions = new Subscription();

    public readonly form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
        } else {
            const subscription = this.authService
                .signIn(this.form.value)
                .subscribe(
                    (res: IAuthResponse) => {
                        localStorage.setItem('user-token', res.token);
                        this.router.navigateByUrl('/challenge');
                    },

                    (err: HttpErrorResponse) => {
                        console.log(err);
                        const message = err.message;
                        alert(message);
                    }
                );
            this.subscriptions.add(subscription);
        }
    }
}
