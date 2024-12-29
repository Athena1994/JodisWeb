

export interface ClientProgress {
    client_id: number;

    phase: string;
    message: string;
    percentage_done: number;
    estimated_phase_time: number;
    estimated_epoch_time: number;
    estimated_total_time: number;
}