import { ClientProgress } from "./client-progress.interface";

export interface Client {
    id: number;
    name: string;
    connected: boolean;
    state: string;
    progress: ClientProgress;
}