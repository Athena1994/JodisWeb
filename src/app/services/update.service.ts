import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { API_URL_TOKEN } from "../app.config";
import { Store } from "@ngrx/store";
import { clientActions } from "../state/clients/clients.actions";
import { io } from "socket.io-client";
import { jobsActions } from "../state/jobs/jobs.actions";


@Injectable({providedIn: 'root'})
export class UpdateService {
    private socket;

    constructor(@Inject(API_URL_TOKEN) private api_url: string,
                private store: Store) {

        this.socket = io(this.api_url.toString()+"update",
        {transports: ['websocket'], timestampRequests: true});

        this.socket.on('client-changed', (changes: []) => changes.forEach(
            ({id, updates}) => {
                this.store.dispatch(
                    clientActions.applyUpdates({id: id, updates}));
        }));

        this.socket.on('client-added', (added: []) => added.forEach(
            (client) => {
                this.store.dispatch(
                    clientActions.applyAdd({client}));
        }));
        this.socket.on('client-deleted', (ids) =>
            this.store.dispatch(
                clientActions.applyRemove({ids}))
        );

        this.socket.on('job-changed', (changes: []) => changes.forEach(
            ({id, updates}) => {
                this.store.dispatch(
                    jobsActions.applyUpdates({id, updates}));
        }));

        this.socket.on('job-added', (added: []) => added.forEach(
            (job) => {
                this.store.dispatch(
                    jobsActions.applyAdd({job}));
        }));
        this.socket.on('job-deleted', (ids) =>
            this.store.dispatch(jobsActions.applyRemove({ids})));

    }
}