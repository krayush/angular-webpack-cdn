import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private urlMap;
    private apiServer;
    private suppressedCodes;
    constructor (private http: Http) {
        this.suppressedCodes = [50001];
        this.apiServer = window["remoteServerUrl"];
        this.urlMap = {
            "getAllTrips": "trips",
            "samplePost": "post",
            "getTripDetails": "trips/{code}",
            "setTripDetails": "trips/{code}"
        };
    }
    private formatURL(url: string, config: Object): string {
        url = this.urlMap[url] ? (this.apiServer + this.urlMap[url]) : url;
        for(var key in config) {
            url = url.replace("{" + key + "}", config[key]);
        }
        return url;
    }
    public post(url: string, data, config: Object): Observable<any[]> {
        console.error("request received")
        let headers = new Headers(Object.assign({
            'Content-Type': 'application/json'
        }, config["headers"] || {}));
        let options = new RequestOptions({
            headers: headers
        });
        url = this.formatURL(url, config);
        return this.http.post(url, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response): Observable<any> {
        let body = res.json();
        return Observable.of(body);
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
