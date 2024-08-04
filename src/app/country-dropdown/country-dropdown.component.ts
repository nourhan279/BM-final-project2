// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// interface Currency {
//   code: string;
//   name: string;
//   flag: string;
// }

// @Component({
//   selector: 'app-country-dropdown',
//   templateUrl: './country-dropdown.component.html',
//   styleUrls: ['./country-dropdown.component.scss'],
// })
// export class CountryDropdownComponent implements OnInit {
//   currencies: Currency[] = [
//     {
//       code: 'USD',
//       name: 'United States Dollar',
//       flag: '/assets/united_states.svg',
//     },
//     {
//       code: 'EUR',
//       name: 'Euro',
//       flag: '/assets/united_states.svg',
//     },
//     {
//       code: 'EGP',
//       name: 'EGP Pound',
//       flag: '/assets/egypt.svg',
//     },
//   ];
//   conversionRates: { [key: string]: number } = {
//     USD: 1,
//     EUR: 0.85,
//     EGP: 15.7,
//   };
//   currencyForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.currencyForm = this.fb.group({
//       senderAmount: [0],
//       senderCurrency: [this.currencies[0].code],
//       recipientAmount: [{ value: 0, disabled: true }],
//       recipientCurrency: [this.currencies[1].code],
//     });
//   }

//   ngOnInit(): void {
//     this.currencyForm.valueChanges.subscribe((values) => {
//       this.updateRecipientAmount();
//     });
//   }

//   updateRecipientAmount() {
//     const { senderAmount, senderCurrency, recipientCurrency } =
//       this.currencyForm.value;

//     const conversionRate = this.getConversionRate(
//       senderCurrency,
//       recipientCurrency
//     );

//     const recipientAmount = senderAmount * conversionRate;

//     this.currencyForm.patchValue(
//       {
//         recipientAmount: recipientAmount,
//       },
//       { emitEvent: false }
//     ); // Prevents looping of valueChanges
//   }

//   getConversionRate(senderCurrency: string, recipientCurrency: string): number {
//     const senderRate = this.conversionRates[senderCurrency];
//     const recipientRate = this.conversionRates[recipientCurrency];

//     return recipientRate / senderRate;
//   }
//   get selectedSenderCurrency(): Currency | undefined {
//     return this.currencies.find(
//       (currency) =>
//         currency.code === this.currencyForm.get('senderCurrency')?.value
//     );
//   }

//   get selectedRecipientCurrency(): Currency | undefined {
//     return this.currencies.find(
//       (currency) =>
//         currency.code === this.currencyForm.get('recipientCurrency')?.value
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface ConversionRates {
  [key: string]: { [key: string]: number };
}

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.scss'],
})
export class CountryDropdownComponent implements OnInit {
  currencies: Currency[] = [
    {
      code: 'USD',
      name: 'United States Dollar',
      flag: '/assets/united_states.svg',
    },
    {
      code: 'EUR',
      name: 'Euro',
      flag: '/assets/united_states.svg',
    },
    {
      code: 'EGP',
      name: 'Egyptian Pound',
      flag: '/assets/egypt.svg',
    },
  ];

  conversionRates: ConversionRates = {
    USD: { EGP: 48.422, EUR: 0.92 },
    EUR: { EGP: 56.78, USD: 1.09 },
  };
  showButton: boolean = true;

  currencyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.currencyForm = this.fb.group({
      senderAmount: [0],
      senderCurrency: [this.currencies[0].code],
      recipientAmount: [{ value: 0, disabled: true }],
      recipientCurrency: [this.currencies[1].code],
    });
  }

  ngOnInit(): void {
    this.currencyForm.valueChanges.subscribe(() => {
      this.updateRecipientAmount();
    });
  }

  updateRecipientAmount() {
    const { senderAmount, senderCurrency, recipientCurrency } =
      this.currencyForm.value;

    const conversionRate = this.getConversionRate(
      senderCurrency,
      recipientCurrency
    );

    const recipientAmount = senderAmount * conversionRate;

    this.currencyForm.patchValue(
      { recipientAmount: recipientAmount },
      { emitEvent: false } // Prevents looping of valueChanges
    );
  }

  getConversionRate(senderCurrency: string, recipientCurrency: string): number {
    const senderRates = this.conversionRates[senderCurrency];
    const conversionRate = senderRates ? senderRates[recipientCurrency] : 1;
    return conversionRate;
  }

  get selectedSenderCurrency(): Currency | undefined {
    return this.currencies.find(
      (currency) =>
        currency.code === this.currencyForm.get('senderCurrency')?.value
    );
  }

  get selectedRecipientCurrency(): Currency | undefined {
    return this.currencies.find(
      (currency) =>
        currency.code === this.currencyForm.get('recipientCurrency')?.value
    );
  }
}
