export type MovementType = 'CREDIT' | 'DEBIT';

export interface AccountMovement {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: MovementType;
  category: string;
}

export const MOCK_MOVEMENTS: AccountMovement[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    description: 'Stipendio Gennaio',
    amount: 2500.00,
    type: 'CREDIT',
    category: 'Lavoro'
  },
  {
    id: '2',
    date: new Date('2024-01-16'),
    description: 'Affitto Gennaio',
    amount: -850.00,
    type: 'DEBIT',
    category: 'Casa'
  },
  {
    id: '3',
    date: new Date('2024-01-18'),
    description: 'Supermercato Esselunga',
    amount: -134.50,
    type: 'DEBIT',
    category: 'Spesa'
  },
  {
    id: '4',
    date: new Date('2024-01-20'),
    description: 'Rimborso Spese Viaggio',
    amount: 320.00,
    type: 'CREDIT',
    category: 'Lavoro'
  },
  {
    id: '5',
    date: new Date('2024-01-22'),
    description: 'Bolletta Enel',
    amount: -89.40,
    type: 'DEBIT',
    category: 'Utenze'
  },
  {
    id: '6',
    date: new Date('2024-01-25'),
    description: 'Freelance Progetto Web',
    amount: 1200.00,
    type: 'CREDIT',
    category: 'Lavoro'
  },
  {
    id: '7',
    date: new Date('2024-01-28'),
    description: 'Palestra mensile',
    amount: -45.00,
    type: 'DEBIT',
    category: 'Sport'
  },
  {
    id: '8',
    date: new Date('2024-02-01'),
    description: 'Dividendi ETF',
    amount: 78.30,
    type: 'CREDIT',
    category: 'Investimenti'
  },
  {
    id: '9',
    date: new Date('2024-02-03'),
    description: 'Ristorante Da Mario',
    amount: -62.00,
    type: 'DEBIT',
    category: 'Ristorante'
  },
  {
    id: '10',
    date: new Date('2024-02-05'),
    description: 'Stipendio Febbraio',
    amount: 2500.00,
    type: 'CREDIT',
    category: 'Lavoro'
  }
];
