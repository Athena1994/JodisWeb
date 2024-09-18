import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { JobService } from "../../services/jobs.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ClientService } from "../../services/clients.service";
import { clientActions } from "./clients.actions";
import { Client } from "../../models/client.interface";


@Injectable()
export class ClientsEffects{

    loadClients$ = createEffect(() => this.actions$.pipe(
        ofType(clientActions.load),
        switchMap(() => this.clientService.getClients().pipe(
            map(clients => clientActions.loadSuccess({ clients })),
            catchError(error => of(clientActions.loadFailure({ error })))
        ))
    ));

    sendClientRequest$ = createEffect(() => this.actions$.pipe(
        ofType(clientActions.sendClientRequest),
        switchMap(({client, cmd, value}) => this.clientService.sendRequest(client, cmd, value).pipe(
            map(() => clientActions.sendClientRequestSuccess()),
            catchError(error => of(clientActions.sendClientRequestFailure({ error })))
        ))
    ));


    constructor(
        private actions$: Actions,
        private clientService: ClientService
    ){}
}