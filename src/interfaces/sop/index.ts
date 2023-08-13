import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SopInterface {
  id?: string;
  questions: string;
  ai_generated_sop?: string;
  uploaded_sop?: string;
  sop_score?: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SopGetQueryInterface extends GetQueryInterface {
  id?: string;
  questions?: string;
  ai_generated_sop?: string;
  uploaded_sop?: string;
  user_id?: string;
}
