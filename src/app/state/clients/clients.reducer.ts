import { createReducer, on } from "@ngrx/store";
import { Job } from "../../models/job.interface";
import { inject } from "@angular/core";
import { Client } from "../../models/client.interface";
import { clientActions } from "./clients.actions";



export interface ClientsState {
    clients: Client[];
    status: 'idle' | 'deleting' | 'loading' | 'waiting' | 'error';
    error: string | null;
};

const initialState: ClientsState = {
    clients: [],
    status: 'idle',
    error: null
};


export const clientsReducer = createReducer(
    initialState,
    on(clientActions.load,
        (state) => ({ ...state, status: 'loading' as const })),
    on(clientActions.loadSuccess,
        (state, { clients }) => {
            return({ ...state, clients, status: 'idle' as const })
        }),
    on(clientActions.updateConnectionState,
        (state, { client_id, connected }) => {
            return({
                ...state,
                clients: state.clients.map(
                    c => c.id === client_id ? {...c, connected} : c)
            })
        }),
    on(clientActions.loadFailure,
        (state, { error }) => ({ ...state, error, status: 'error' as const })),
    on(clientActions.requestStateChange,
        (state) => ({ ...state, status: 'waiting' as const })),
    on(clientActions.requestStateChangeSuccess,
        (state, {client}) => ({...state,
            status: 'idle' as const,
            clients: state.clients.map(c => c.id === client.id ? client : c)})),
    on(clientActions.requestStateChangeFailure,
        (state, { error }) => ({ ...state, error, status: 'error' as const }))
);