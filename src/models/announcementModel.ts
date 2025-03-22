export interface IAnnouncement {
  id?: number;
  topic: string;
  description?: string;
  file?: string;
  posted_date?: Date;
  advisor_id?: number;
}