export interface IAnnouncement {
  id?: number;
  topic: string;
  description: string;
  file?: string;
  postedDate: Date;
  advisorId: number;
}