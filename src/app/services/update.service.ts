import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { API_URL_TOKEN } from "../app.config";
import { Store } from "@ngrx/store";
import { clientActions } from "../state/clients/clients.actions";
import { io } from "socket.io-client";


@Injectable({providedIn: 'root'})
export class UpdateService {
    private socket;

    constructor(@Inject(API_URL_TOKEN) private api_url: string,
                private store: Store) {

        this.socket = io(this.api_url.toString()+"update",
        {transports: ['websocket'], timestampRequests: true});

        this.socket.on('client-connection-changed', ({id, connected}) => {
            this.store.dispatch(
                clientActions.updateConnectionState(
                    {client_id: id, connected}));
        })
    }
}