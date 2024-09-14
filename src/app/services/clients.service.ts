import { Inject, inject, Injectable, InjectionToken } from "@angular/core";
import { Client } from "../models/client.interface";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { API_URL_TOKEN } from "../app.config";

@Injectable({providedIn: 'root'})
export class ClientService {

    constructor(private http: HttpClient,
                @Inject(API_URL_TOKEN) private api_url: string) {}

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.api_url.toString()+"clients")
    }

    sendRequest(client: Client, cmd: string, args: any){
        return this.http.post(
            this.api_url.toString()+"client/request",
            ({clientId: client.id, cmd, args: args}))
    }
}