import { Component } from "@angular/core";
import { RoutesInfo } from '../../resources/routes';
import { Router } from "@angular/router";

@Component ({
    selector: 'header',
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    public routesInfo: any[];
    constructor(routesInfo: RoutesInfo, private router: Router) {

        // var self = this;
        // UserService.init().done(function(MetaData) {
        //     self.$$.loadTemplate(self.path("olp.header.html"), MetaData).done(function() {
        //         self.bindEvents();
        //         self.fetchImportJobs();
        //         self.fetchExportJobs();
        //     });
        // });
        //
        // var progress = {
        //     pending: 0,
        //     completed: 0,
        //     percentage: 1,
        //     start: function() {
        //         this.pending++;
        //         this.calculate();
        //     },
        //     complete: function() {
        //         this.completed++;
        //         this.calculate();
        //     },
        //     calculate: (function() {
        //         if ((this.pending === this.completed) || (this.pending === 0)) {
        //             this.pending = 0;
        //             this.completed = 0;
        //             this.percentage = 1;
        //         } else {
        //             var newPer = (this.completed * this.completed) / (this.pending * this.pending);
        //             this.percentage = newPer === 0 ? newPer : Math.max(this.percentage, newPer);
        //         }
        //         this.animate();
        //     }),
        //     show: function() {
        //         if (this.percentage === 1) {
        //             self.$$.find(".progress-line").css("width", "97%").css("width", "100%");
        //         } else {
        //             self.$$.find(".progress-line").css("width", this.percentage * 100 + "%");
        //         }
        //     },
        //     animate: function() {
        //         var self2 = this;
        //         this.show();
        //         if (this.pending > this.completed) {
        //             this.percentage = Math.max(this.percentage + (1 - this.percentage) / 50, this.percentage);
        //             window.setTimeout(function() {
        //                 self2.animate();
        //             }, 250);
        //         }
        //     }
        // };
        //
        // jQuery.ajaxSetup({
        //     beforeSend: function() {
        //         progress.start();
        //     },
        //     progress: function() {
        //         console.info("progress...", arguments);
        //     },
        //     complete: function() {
        //         progress.complete();
        //     }
        // });
    }
}