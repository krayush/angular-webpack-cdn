import { Component,OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'barrel',
    template: `
        <h1 (click)="fetchData()">Hello from Barrel</h1>
        <span>
            <a [routerLink]=" ['./child-barrel'] ">
                Child Barrel
            </a>
        </span>
        <router-outlet></router-outlet>
    `
})
export class BarrelComponent implements OnInit {
    private netTalker;
    constructor(private talker: DataService) {
        this.netTalker = talker;
    }
    public ngOnInit() {
        console.log('hello `Barrel` component');
    }
    public fetchData() {
        console.error("Request sending");
        this.netTalker.post("samplePost", [], {})
            .subscribe((data)=>{
                console.error(data.value);
            });
    }
}
