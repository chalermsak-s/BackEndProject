export interface IFeedback {
  id?: number;
  feedback: string;
  timestamp?: Date;
  student_id?: number;
  advisor_id?: number;
  responder_id?: number;
  admin_id?: number;
  parent_feedback_id?: number;
}

export interface IResponder {
  id?: number;
  responder: string;
}