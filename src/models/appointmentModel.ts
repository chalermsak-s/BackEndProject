export interface IAppointment {
  id?: number;
  topic: string;
  description?: string;
  requested_date: Date;
  appointment_request_date: Date;
  student_confirmation: boolean;
  student_id?: number;
  advisor_id?: number;
  status_appointment_id?: number;
  admin_id?: number;
}

export interface IStatusAppointment {
  id?: number;
  status: string;
}