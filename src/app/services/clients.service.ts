import { Inject, inject, Injectable, InjectionToken } from "@angular/core";
import { Client } from "../models/client.interface";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { API_URL_TOKEN } from "../app.config";
import { ClientProgress } from "../models/client-progress.interface";

@Injectable({providedIn: 'root'})
export class ClientService {

    constructor(private http: HttpClient,
                @Inject(API_URL_TOKEN) private api_url: string) {}

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.api_url.toString()+"clients")
    }

    deleteClient(client: Client) {
        return this.http.post(this.api_url.toString()+"client/delete",
            ({clientId: client.id}))}

    sendRequest(client: Client, cmd: string, args: any){
        return this.http.post(
            this.api_url.toString()+"client/request",
            ({clientId: client.id, cmd, args: args}))
    }
    getProgressInfos(): Observable<ClientProgress[]> {
        return this.http.get<ClientProgress[]>(
            this.api_url.toString()+"progress")
    }
}