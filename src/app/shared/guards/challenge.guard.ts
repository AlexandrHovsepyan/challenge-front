import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ChallengeGuard implements CanLoad {

    constructor(private readonly router: Router) { }

    canLoad(): boolean {
        const condition = localStorage.getItem('user-token') && localStorage.getItem('user-email');
        if (condition) return true;

        this.router.navigateByUrl('/auth');
        return false;
    }
}
