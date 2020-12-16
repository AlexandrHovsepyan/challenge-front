import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISignUpResponse } from '../models/sign-up-responce.interface';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {

    private readonly subscriptions = new Subscription();

    public readonly form = new FormGroup({
        firstName: new FormControl(null, Validators.required),
        secondName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
    })

    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
        }
        else {
            const subscription = this.authService
                .signUp(this.form.value)
                .subscribe(
                    (res: ISignUpResponse) => {
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
