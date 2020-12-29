import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeRoutingModule } from './challenge-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ChallengeComponent } from './challenge.component';
import { PopupComponent } from './popup/popup.component';
import { GameComponent } from './game/game.component';

import { SocketService } from './services/socket.service';

@NgModule({
    declarations: [
        ChallengeComponent,
        PopupComponent,
        GameComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ChallengeRoutingModule,
    ],
    providers: [
        SocketService
    ]
})
export class ChallengeModule { }
