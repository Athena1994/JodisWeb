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
    on(clientActions.applyUpdates,
        (state, { client_id, updates }) => {
            return({
                ...state,
                clients: state.clients.map(c => {
                    if (c.id === client_id) {

                        return { ...c, ...updates }
                    }
                    return c;
                })
            })
        }),
    on(clientActions.loadFailure,
        (state, { error }) => ({ ...state, error, status: 'error' as const })),
    on(clientActions.sendClientRequest,
        (state) => ({ ...state, status: 'waiting' as const })),
    on(clientActions.sendClientRequestSuccess,
        (state) => ({...state, status: 'idle' as const })),
    on(clientActions.sendClientRequestFailure,
        (state, { error }) => ({ ...state, error, status: 'error' as const }))
);