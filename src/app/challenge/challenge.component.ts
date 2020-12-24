import { Component } from '@angular/core';
import * as io from 'socket.io-client';

import { environment } from 'src/environments/environment';
import { Socket } from "./enums/socket.enum";

@Component({
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent {
    private readonly socket: any;
    private readonly socketUrl = environment.socketUrl;

    constructor() {
        // @ts-ignore
        this.socket = io.connect(this.socketUrl, {
            query: {
                token: localStorage.getItem('user-token')
            }
        });

        this.socket.on('connect_error', (err: Error) => {
            // do something with err
            console.log('connect_error', err);
        });

        this.socket.on('error', (err: Error) => {
            // do something with err
            console.log('error',err);
        });

        this.getOnlineUsers();

        this.socket.on(Socket.NEW_USER_CONNECTION, (email: string) => {
            console.log(email);
        });

    }

    public getOnlineUsers(): void {

        this.socket.emit(Socket.GET_ONLINE_USERS);

        this.socket.on(Socket.ONLINE_USERS_LIST, (users: Array<string>) => console.log(users));
    }
}
