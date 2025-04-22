import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from "rxjs";
import { API_URL_TOKEN } from "../app.config";
import { ModuleMeta} from "../models/module-meta.interface";
import { VersionMeta } from "../models/version-meta";

@Injectable({providedIn: 'root'})
export class MetaService {
    reload(name: string): Observable<ModuleMeta> {
        return this.http.post(this.api_url.toString()+"meta/module/reload",
            {moduleName: name}) as Observable<ModuleMeta>;
    }

    constructor(private http: HttpClient,
                @Inject(API_URL_TOKEN) private api_url: string) {}

    getServerVersion(): Observable<string> {
        return this.http.get(this.api_url.toString()+"meta/version",
            {responseType: 'text'})
    }

    getVersion(moduleName: string, version: string): Observable<VersionMeta> {
        return this.http.get<VersionMeta>(this.api_url.toString()+"meta/moduleVersion",
            {params: {moduleName, version}})
    }

    getModuleList(): Observable<ModuleMeta[]> {
        // return of([
        //     { id: 0, name: "Module A", version: "1.0.1", icon_url: null, active: true, job_processor: true} as ModuleMeta,
        //     { id: 1, name: "Module B", version: "1.1.1", icon_url: '', active: false, job_processor: true} as ModuleMeta,
        //     { id: 2, name: "Module C", version: "1.0.5", icon_url: '', active: true, job_processor: true} as ModuleMeta,
        // ])
        var modules
            = this.http.get<ModuleMeta[]>(this.api_url.toString()+"meta/modules")


        return modules
    }

    uploadModule(file: File, overwrite: boolean): Observable<any> {

        return of({status: "success", message: "Module uploaded successfully"});

        const formData = new FormData();
        formData.append('file', file);
        formData.append('overwrite', overwrite.toString());
        return this.http.post(this.api_url.toString()+"meta/upload", formData)
    }

    deleteModule(module: ModuleMeta) {
        return of({status: "success", message: "Module deleted successfully"});

        return this.http.post(this.api_url.toString()+"meta/delete",
            ({moduleId: module.name}))}

}