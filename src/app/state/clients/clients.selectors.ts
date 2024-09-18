import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { ClientsState } from "./clients.reducer";


export const selectClientsState = createFeatureSelector<ClientsState>('clients');

export const selectClients = createSelector(selectClientsState,
    state => state.clients
);

export const selectActionPending = createSelector(selectClientsState,
    state => state.status !== 'idle'
);