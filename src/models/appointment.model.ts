export interface IAppointment {
  id?: number;
  topic: string;
  description: string;
  requestedDate: Date;
  appointmentRequestDateTime: Date;
  studentConfirmation: boolean;
  studentId: number;
  advisorId: number;
  statusAppointmentId: number;
}

export interface IStatusAppointment {
  id?: number;
  status: string;
}