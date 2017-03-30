import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'detail',
    templateUrl: 'detail.component.html',
})

export class DetailComponent implements OnInit {
    private options;
    constructor() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
    }
    public ngOnInit() {
        console.log('hello `Detail` component');
    }
}
