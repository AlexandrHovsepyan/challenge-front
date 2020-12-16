import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// components
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';

// services
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthService,
    ]
})
export class AuthModule { }