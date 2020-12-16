import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { NotFoundComponent } from './not-found/not-found.component';

// guards
import { AuthGuard } from './shared/guards/auth.guard';
import { ChallengeGuard } from './shared/guards/challenge.guard';

const routes: Routes = [
    {
        path: "",
        redirectTo: 'challenge',
        pathMatch: 'full'
    },
    {
        path: "challenge",
        loadChildren: () => import('./challenge/challenge.module').then(m => m.ChallengeModule),
        canLoad: [ChallengeGuard]
    },
    {
        path: "auth",
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
