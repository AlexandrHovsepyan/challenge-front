import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SocketEventIn, SocketEventOut} from './enums/socket.enum';
@Component({
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit, OnDestroy {

    public loaderController = false;
    public showUsersListResult = false;
    public usersList: string[] = [];

    constructor(private readonly socketService: SocketService, private readonly router: Router, private readonly dialog: MatDialog) { }

    ngOnInit() {
        this.socketService.subscribeToEvent(SocketEventIn.ONLINE_USERS_LIST, this.addUserList);
        this.socketService.subscribeToEvent(SocketEventIn.NEW_USER_CONNECTION, this.addUserToList);
        this.socketService.subscribeToEvent(SocketEventIn.DISCONNECT_USER, this.removeUserFromList);
        this.socketService.subscribeToEvent(SocketEventIn.NEW_CHALLENGE_REQUEST, this.onOffer);
        this.socketService.subscribeToEvent(SocketEventIn.START_GAME, this.gameConfirm);

        //errors
        this.socketService.subscribeToEvent(SocketEventIn.SERVER_SOCKET_ERROR, this.handleError);
        this.socketService.subscribeToEvent(SocketEventIn.CONNECT_ERROR, this.handleError);
        this.socketService.subscribeToEvent(SocketEventIn.ERROR, this.handleError);

        this.loaderController = true;
        this.socketService.socketEmit(SocketEventOut.GET_ONLINE_USERS);
    }

    ngOnDestroy() {
        this.socketService.unsubscribeFromEvent(SocketEventIn.NEW_USER_CONNECTION);
        this.socketService.unsubscribeFromEvent(SocketEventIn.DISCONNECT_USER);
        this.socketService.unsubscribeFromEvent(SocketEventIn.NEW_CHALLENGE_REQUEST);
        this.socketService.unsubscribeFromEvent(SocketEventIn.START_GAME);

        //errors
        this.socketService.unsubscribeFromEvent(SocketEventIn.SERVER_SOCKET_ERROR);
    }

    private addUserList = (list: string[]): void => {
        this.loaderController = false;

        this.usersList = list;
        this.showUsersListResult = true;
        this.socketService.unsubscribeFromEvent(SocketEventIn.ONLINE_USERS_LIST);
    }

    private addUserToList = (user: string): void => {
        this.usersList.push(user);
    }

    private removeUserFromList = (user: string): void => {
        const userIndex = this.usersList.findIndex(userFromList => user === userFromList);
        this.usersList.splice(userIndex, 1);
    }

    public onUserSelect(index: number): void {
        this.loaderController = true;
        this.showUsersListResult = false;
        this.socketService.socketEmit(SocketEventOut.CHALLENGE_REQUEST, this.usersList[index]);
    }

    public gameConfirm = (questions: Array<{}> ): void => {
        alert(questions);
    }

    public onOffer = (email: string): void => {
        const data = {
            width: '200px',
            data: { email }
        };

        const dialogRef = this.dialog.open(PopupComponent, data);

        dialogRef.afterClosed()
            .pipe(
                filter(res => !!res)
            )
            .subscribe((res: string) => {
                this.sendConfirmation(res);
            });
    }

    private sendConfirmation(email: string): void {
        this.socketService.socketEmit(SocketEventOut.APPROVE_CHALLENGE_REQUEST, email);
        // this.gameConfirm(email);
    }

    private handleError(error: {}): void {
        console.log('handleError', error);
    }
}
import {SocketService} from './services/socket.service';
import {PopupComponent} from './popup/popup.component';


import {filter} from 'rxjs/operators';
