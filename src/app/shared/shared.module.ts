import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [

    ],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        HttpClientModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        HttpClientModule,
    ]
})
export class SharedModule { }