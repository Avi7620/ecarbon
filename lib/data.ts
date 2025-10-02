export interface CarbonProject {
  id: string;
  name: string;
  description: string;
  location: string;
  projectType: 'reforestation' | 'renewable_energy' | 'ocean_conservation' | 'sustainable_agriculture';
  creditsAvailable: number;
  creditsSold: number;
  pricePerCredit: number;
  imageUrl: string;
  verificationStandard: string;
  co2OffsetPerCredit: number;
}

export const carbonProjects: CarbonProject[] = [
  {
    id: '1',
    name: 'Amazon Rainforest Protection',
    description: 'Protecting 50,000 hectares of pristine Amazon rainforest from deforestation through community-based conservation programs.',
    location: 'Brazil',
    projectType: 'reforestation',
    creditsAvailable: 100000,
    creditsSold: 12450,
    pricePerCredit: 15.00,
    imageUrl: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
    verificationStandard: 'VCS',
    co2OffsetPerCredit: 1.0,
  },
  {
    id: '2',
    name: 'Solar Farm Initiative Kenya',
    description: 'Large-scale solar energy installation providing clean electricity to 25,000 homes in rural Kenya.',
    location: 'Kenya',
    projectType: 'renewable_energy',
    creditsAvailable: 75000,
    creditsSold: 8920,
    pricePerCredit: 12.50,
    imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg',
    verificationStandard: 'Gold Standard',
    co2OffsetPerCredit: 1.0,
  },
  {
    id: '3',
    name: 'Wind Power Australia',
    description: 'Offshore wind turbine project generating 200MW of renewable energy along the southern coast.',
    location: 'Australia',
    projectType: 'renewable_energy',
    creditsAvailable: 50000,
    creditsSold: 15600,
    pricePerCredit: 18.00,
    imageUrl: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
    verificationStandard: 'VCS',
    co2OffsetPerCredit: 1.0,
  },
  {
    id: '4',
    name: 'Mangrove Restoration Indonesia',
    description: 'Restoring 10,000 hectares of mangrove forests to protect coastlines and sequester carbon.',
    location: 'Indonesia',
    projectType: 'ocean_conservation',
    creditsAvailable: 80000,
    creditsSold: 5200,
    pricePerCredit: 14.00,
    imageUrl: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg',
    verificationStandard: 'Gold Standard',
    co2OffsetPerCredit: 1.0,
  },
  {
    id: '5',
    name: 'Biogas Community India',
    description: 'Converting agricultural waste to biogas energy for 15,000 rural households in Punjab.',
    location: 'India',
    projectType: 'sustainable_agriculture',
    creditsAvailable: 60000,
    creditsSold: 9800,
    pricePerCredit: 11.00,
    imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
    verificationStandard: 'VCS',
    co2OffsetPerCredit: 1.0,
  },
  {
    id: '6',
    name: 'Native Forest Regeneration',
    description: 'Natural forest regeneration project spanning 30,000 acres in the Pacific Northwest.',
    location: 'USA',
    projectType: 'reforestation',
    creditsAvailable: 45000,
    creditsSold: 18900,
    pricePerCredit: 20.00,
    imageUrl: 'https://images.pexels.com/photos/1179590/pexels-photo-1179590.jpeg',
    verificationStandard: 'CAR',
    co2OffsetPerCredit: 1.0,
  },
];

export interface FootprintData {
  electricityKwh: number;
  naturalGasTherms: number;
  carMiles: number;
  flightsHours: number;
}

export function calculateCarbonFootprint(data: FootprintData): number {
  const electricityCO2 = data.electricityKwh * 0.0004;
  const gasCO2 = data.naturalGasTherms * 0.0053;
  const carCO2 = data.carMiles * 0.0004;
  const flightsCO2 = data.flightsHours * 0.09;

  return electricityCO2 + gasCO2 + carCO2 + flightsCO2;
}
