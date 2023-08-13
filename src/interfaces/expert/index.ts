import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ExpertInterface {
  id?: string;
  availability: boolean;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ExpertGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
