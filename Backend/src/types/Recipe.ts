import { JobName } from './JobName';
import { Item } from './Item';

export interface Recipe {
  id: number;
  resultItemId: number;
  requiredItems: any; // Json
  successRate: number;
  skillRequired?: string | null;
  jobRequired?: JobName | null;
  minLevel?: number | null;
  item?: Item;
}
