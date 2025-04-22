import { createReducer, on } from "@ngrx/store";
import { inject } from "@angular/core";
import { ModuleMeta } from "../../models/module-meta.interface";
import { metaActions } from "./meta.actions";

export interface MetaState {
    version: string;
    modules: ModuleMeta[];
    error: string | null;
};

const initialState: MetaState = {
    version: '',
    modules: [],
    error: null
};


export const metaReducer = createReducer(
    initialState,
    on(metaActions.getServerVersionSuccess, (state, {version}) =>
        ({ ...state, version })),
    on(metaActions.getServerVersionFailure, (state, {error}) =>
        ({ ...state, error })),



    on(metaActions.loadModulesSuccess, (state, {modules}) =>
        ({ ...state, modules })),
    on(metaActions.loadModulesFailure, (state, {error}) =>
        ({ ...state, error })),

    on(metaActions.uploadModuleSuccess, (state, {module}) =>
        ({ ...state, modules: [...state.modules, module] })),
    on(metaActions.uploadModuleFailure, (state, {error}) =>
        ({ ...state, error })),

    on(metaActions.deleteModuleSuccess, (state, {moduleName}) =>
        ({ ...state, modules: state.modules.filter(m => m.name !== moduleName) })),
    on(metaActions.deleteModuleFailure, (state, {error}) =>
        ({ ...state, error })),

    on(metaActions.reloadModuleSuccess, (state, {module}) =>
        ({ ...state, modules: state.modules.map(m => m.name === module.name ? module : m) })),
    on(metaActions.reloadModuleFailure, (state, {error}) =>
        ({ ...state, error }))
);