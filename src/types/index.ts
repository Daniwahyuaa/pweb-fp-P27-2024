export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR'
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}

export interface Item {
  id: string;
  name: string;
  amount: number;
  condition: 'Good' | 'Fair' | 'Poor';
  created_at: Date;
}

export interface BorrowedItem {
  id: string;
  item_name: string;
  amount: number;
  borrow_date: Date;
  return_date: Date;
  borrower_name: string;
  officer_name: string;
  status: 'Borrowed' | 'Returned';
}