interface HomePlan {
  homePlanId: number;
  name: string;
  numBeds: number;
  numBaths: number;
  sqft: number;
  tags: Array<string>;
  description: string;
  image: string;
}

interface Lot {
  lotId: number;
  address: string;
  acres: numberl;
  description: string;
  image: string;
}

interface Combination {
  homePlanId: number;
  lotId: number;
}
