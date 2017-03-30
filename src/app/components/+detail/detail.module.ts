import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'angular2-highcharts';

import { routes } from './detail.routes';
import { DetailComponent } from './detail.component';

console.log('`Detail` bundle loaded asynchronously');

@NgModule({
    declarations: [
        DetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartModule.forRoot(require('highcharts')),
        RouterModule.forChild(routes),
    ],
})
export class DetailModule {
    public static routes = routes;
}
