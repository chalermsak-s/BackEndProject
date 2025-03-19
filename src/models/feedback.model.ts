export interface IFeedback {
  id?: number;
  message: string;
  timestamp: Date;
  isFromAdvisor: boolean;
  senderId: number;
  senderType: 'STUDENT' | 'ADVISOR';
  receiverId: number;
  receiverType: 'STUDENT' | 'ADVISOR';
}