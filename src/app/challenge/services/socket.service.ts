import * as io from 'socket.io-client'
import { environment } from '../../../environments/environment';

import { SocketEventIn, SocketEventOut } from "../enums/socket.enum";

export class SocketService {
    private socket: any; //SocketIOClient.Socket
    private readonly socketUrl = environment.socketUrl;

    constructor() {
        // @ts-ignore
        // for .connect
        this.socket = io.connect(this.socketUrl, {
            query: {
                token: localStorage.getItem('user-token')
            }
        });
    }

    public subscribeToEvent(event: SocketEventIn, cb: Function): void {
        this.socket.on(event, cb);
    }

    public unsubscribeFromEvent(event: SocketEventIn): void {
        this.socket.off(event);
    }

    public socketEmit(key: SocketEventOut, data?: any): void {
        this.socket.emit(key, data);
    }
}
