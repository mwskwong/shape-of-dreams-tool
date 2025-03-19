export interface Memory {
  name: string;
  cooldownTime: number;
  maxCharges: number;
  addedCharges: number;
  description: string;
  shortDescription: string | null;
  rarity: string;
  type: string;
  traveler: string;
  travelerMemoryLocation: string;
  tags: string[];
  image: string;
}

export interface Essence {
  name: string;
  description: string;
  rarity: string;
  image: string;
}
