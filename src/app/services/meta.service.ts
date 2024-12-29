import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { API_URL_TOKEN } from "../app.config";
import { ModuleMeta} from "../models/module-meta.interface";

@Injectable({providedIn: 'root'})
export class MetaService {

    constructor(private http: HttpClient,
                @Inject(API_URL_TOKEN) private api_url: string) {}

    getServerVersion(): Observable<string> {
        return of("0.1.0");
        // return this.http.get(this.api_url.toString()+"meta/version",
        //     {responseType: 'text'})
    }

    getModuleList(): Observable<ModuleMeta[]> {
        return of([
            { id: 0, name: "Module A", version: "1.0.1", icon_url: null, active: true} as ModuleMeta,
            { id: 1, name: "Module B", version: "1.1.1", icon_url: '', active: false} as ModuleMeta,
            { id: 2, name: "Module C", version: "1.0.5", icon_url: '', active: true} as ModuleMeta,
        ])
    //    return this.http.get<ModuleMeta[]>(this.api_url.toString()+"meta/modules")
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
            ({moduleId: module.id}))}

}