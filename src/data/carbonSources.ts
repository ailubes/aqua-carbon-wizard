
export type CarbonSource = {
  name: string;
  availableCarbon: number;
  notes?: string;
};

export const carbonSources: CarbonSource[] = [
  {
    name: "Molasses",
    availableCarbon: 0.24,
    notes: "Assume a carbon concentration of 24% w/w and a specific weight of 1.3 g/ml"
  },
  {
    name: "White Sugar",
    availableCarbon: 0.421
  },
  {
    name: "Lactose",
    availableCarbon: 0.421
  },
  {
    name: "Dextrose",
    availableCarbon: 0.4
  },
  {
    name: "Glucose",
    availableCarbon: 0.4
  },
  {
    name: "Acetate",
    availableCarbon: 0.4
  },
  {
    name: "Glycerol",
    availableCarbon: 0.391
  },
  {
    name: "Cellulose",
    availableCarbon: 0.444
  },
  {
    name: "Starch",
    availableCarbon: 0.444
  },
  {
    name: "Cassava meal",
    availableCarbon: 0.434
  },
  {
    name: "Corn flour",
    availableCarbon: 0.434
  },
  {
    name: "Rice bran",
    availableCarbon: 0.434
  },
  {
    name: "Sorghum meal",
    availableCarbon: 0.434
  },
  {
    name: "Tapioca",
    availableCarbon: 0.434
  },
  {
    name: "Wheat flour",
    availableCarbon: 0.434
  },
  {
    name: "Wheat bran",
    availableCarbon: 0.434
  }
];
