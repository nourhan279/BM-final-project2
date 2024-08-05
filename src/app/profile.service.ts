import { Injectable } from '@angular/core';

export interface User2 {
  username: string;
  email: string;
  phoneNumber: null;
  address: string;
  country: string;
  gender: null;
  dateOfBirth: string;
  password: string;
  card: null;
}
export interface user {
  fname: string;
  lname: string;
  email: string;
  password: string;
  balance: number;
  gender: string;
  phone: number;
  accountno: number;
}
export interface TransferHistory {
  recipientName: string;
  amount: number;
  accountNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  getUser(): user {
    return {
      fname: 'nourhan',
      lname: 'mohamed',
      email: 'john.doe@example.com',
      password: 'password123',
      balance: 1000,
      gender: 'Male',
      phone: 1234567890,
      accountno: 99898984793749348,
    };
  }

  private phistory: TransferHistory[] = [
    { recipientName: 'John Doe', amount: 1000, accountNumber: '1234567890' },
    { recipientName: 'Jane Smith', amount: 500, accountNumber: '0987654321' },
  ];

  getHistory(): TransferHistory[] {
    return this.phistory;
  }
}
