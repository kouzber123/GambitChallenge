export type Root = gambitData[];

export interface gambitData {
  timeStamp: string;
  registerValues: RegisterValues;
  registers: Register[];
}

export interface RegisterValues {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

export interface Register {
  register: number;
  value: number;
  description: string;
  unit: string;
}
