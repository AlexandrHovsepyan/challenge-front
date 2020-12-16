import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeRoutingModule } from './challenge-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        SharedModule,
        ChallengeRoutingModule,
    ],
})
export class ChallengeModule { }