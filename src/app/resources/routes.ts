import { Routes } from '@angular/router';
import { NoContentComponent } from '../components/no-content';
import { AboutComponent } from '../components/about';

export class RoutesInfo {
    private routingConfig: Routes;
    private sidebarConfig = {
        dashboard: {
            displayName: 'Dashboard',
            accessKey: '',
            routingConfig: {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        },
        crisis: {
            displayName: 'CRISIS',
            accessKey: '',
            routingConfig: {
                path: 'barrel',
                loadChildren: '../components/+barrel#BarrelModule'
            }
        },
        events: {
            displayName: 'EVENTS',
            accessKey: '',
            routingConfig: {
                path: 'detail',
                loadChildren: '../components/+detail#DetailModule'
            }
        },
        about: {
            displayName: 'ABOUT',
            accessKey: '',
            routingConfig: {
                path: 'about',
                component: AboutComponent
            }
        },
        module404: {
            routingConfig: {
                path: '**',
                component: NoContentComponent
            }
        }
    };
    private modules: any[] = [{
        label: 'DASHBOARD',
        icon: 'dashboard',
        moduleId: 'dashboard',
        accessKey: 'DASHBOARD'
    }, {
        label: 'SHIPMENTS',
        icon: 'shipments',
        accessKey: 'SHIPMENTS',
        // If this is not defined, nothing will happen on icon click
        defaultModuleId: 'crisis',
        sections: [{
            label: 'View Shipments',
            tabs: [
                'crisis'
            ]
        }, {
            moduleId: 'events'
        }]
    }, {
        label: 'EVENTS',
        icon: 'inbound',
        moduleId: 'events',
        accessKey: 'INBOUND'
    }, {
        label: 'ABOUT',
        icon: 'about',
        moduleId: 'about',
        accessKey: 'ABOUT'
    }];
    public getRoutingConfig() {
        this.routingConfig = [];
        let moduleIds = Object.keys(this.sidebarConfig);
        moduleIds.forEach((key) => {
            this.routingConfig.push(this.sidebarConfig[key].routingConfig);
        });
        return this.routingConfig;
    }
    public getSidebarConfig () {
        let self = this;
        self.modules.map(function(module) {
            if(module.moduleId) {
                module.config = self.sidebarConfig[module.moduleId];
            } else {
                if(module.defaultModuleId) {
                    module.config = self.sidebarConfig[module.defaultModuleId];
                }
                module.sections.map(function (section) {
                    if(section.moduleId) {
                        section.config = self.sidebarConfig[section.moduleId];
                    } else {
                        let tabs = [];
                        section.tabs.map(function (moduleId) {
                            tabs.push({
                                moduleId: moduleId,
                                config: self.sidebarConfig[moduleId]
                            });
                        });
                        section.tabs = tabs;
                    }
                });
            }
        });
        return this.modules;
    }
}
