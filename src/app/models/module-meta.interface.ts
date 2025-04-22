import { VersionMeta } from "./version-meta";


export interface ModuleMeta {
    name: string;
    active_version: string;
    description: string
    icon_url: string | null;
    running: boolean;
    job_processor: boolean;
    versions: VersionMeta[];
    error: string

}