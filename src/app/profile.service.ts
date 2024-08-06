import { Injectable } from '@angular/core';

export interface User2 {
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  dateOfBirth: string;
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
}
