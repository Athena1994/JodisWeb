import { createFeature, createFeatureSelector, createSelector, select } from "@ngrx/store";
import { MetaState } from "./meta.reducer";
import { map } from "rxjs";

export const selectMetaState = createFeatureSelector<MetaState>('meta');

export const selectModules = createSelector(selectMetaState,
    state => state.modules);

export const selectVersion = createSelector(selectMetaState,
    state => state.version);

export const selectJobModules = createSelector(selectModules,
    modules => modules.filter(module => module.job_processor));
