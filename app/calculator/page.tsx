"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, Car, Plane, Flame, TrendingUp, Leaf } from 'lucide-react';
import { calculateCarbonFootprint, carbonProjects } from '@/lib/data';
import Link from 'next/link';

export default function CalculatorPage() {
  const [electricity, setElectricity] = useState(500);
  const [naturalGas, setNaturalGas] = useState(50);
  const [carMiles, setCarMiles] = useState(800);
  const [flightHours, setFlightHours] = useState(10);
  const [calculated, setCalculated] = useState(false);
  const [totalCO2, setTotalCO2] = useState(0);

  const handleCalculate = () => {
    const total = calculateCarbonFootprint({
      electricityKwh: electricity,
      naturalGasTherms: naturalGas,
      carMiles: carMiles,
      flightsHours: flightHours,
    });
    setTotalCO2(total);
    setCalculated(true);
  };

  const creditsNeeded = Math.ceil(totalCO2);
  const estimatedCost = creditsNeeded * 15;

  const breakdownData = [
    {
      icon: Zap,
      label: 'Electricity',
      value: electricity,
      unit: 'kWh/month',
      co2: (electricity * 0.0004).toFixed(2),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Flame,
      label: 'Natural Gas',
      value: naturalGas,
      unit: 'therms/month',
      co2: (naturalGas * 0.0053).toFixed(2),
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Car,
      label: 'Car Travel',
      value: carMiles,
      unit: 'miles/month',
      co2: (carMiles * 0.0004).toFixed(2),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Plane,
      label: 'Air Travel',
      value: flightHours,
      unit: 'hours/year',
      co2: (flightHours * 0.09).toFixed(2),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Calculator className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Carbon Footprint Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estimate your carbon emissions and discover how many carbon credits you need to offset your impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Enter Your Usage</CardTitle>
              <CardDescription>
                Provide your monthly and annual consumption data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="electricity" className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span>Electricity Usage</span>
                  </Label>
                  <span className="text-sm font-medium">{electricity} kWh/month</span>
                </div>
                <Slider
                  id="electricity"
                  min={0}
                  max={2000}
                  step={50}
                  value={[electricity]}
                  onValueChange={(value) => setElectricity(value[0])}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="naturalGas" className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-orange-600" />
                    <span>Natural Gas</span>
                  </Label>
                  <span className="text-sm font-medium">{naturalGas} therms/month</span>
                </div>
                <Slider
                  id="naturalGas"
                  min={0}
                  max={200}
                  step={5}
                  value={[naturalGas]}
                  onValueChange={(value) => setNaturalGas(value[0])}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="carMiles" className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-blue-600" />
                    <span>Car Miles</span>
                  </Label>
                  <span className="text-sm font-medium">{carMiles} miles/month</span>
                </div>
                <Slider
                  id="carMiles"
                  min={0}
                  max={3000}
                  step={100}
                  value={[carMiles]}
                  onValueChange={(value) => setCarMiles(value[0])}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="flightHours" className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-purple-600" />
                    <span>Flight Hours</span>
                  </Label>
                  <span className="text-sm font-medium">{flightHours} hours/year</span>
                </div>
                <Slider
                  id="flightHours"
                  min={0}
                  max={100}
                  step={1}
                  value={[flightHours]}
                  onValueChange={(value) => setFlightHours(value[0])}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
                size="lg"
              >
                Calculate My Footprint
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {calculated ? (
              <>
                <Card className="shadow-lg bg-emerald-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6" />
                      <span>Your Carbon Footprint</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-2">{totalCO2.toFixed(2)}</div>
                      <div className="text-xl opacity-90">tons CO₂ per year</div>
                      <div className="mt-6 pt-6 border-t border-emerald-500">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-3xl font-bold">{creditsNeeded}</div>
                            <div className="text-sm opacity-90">Credits Needed</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold">${estimatedCost}</div>
                            <div className="text-sm opacity-90">Estimated Cost</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Emissions Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {breakdownData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`${item.bgColor} p-2 rounded-lg`}>
                              <item.icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-gray-600">
                                {item.value} {item.unit}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.co2} tons</div>
                            <div className="text-xs text-gray-600">CO₂/year</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-2 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                      <span>Offset Your Impact</span>
                    </CardTitle>
                    <CardDescription>
                      Neutralize your carbon footprint with verified projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          You need approximately <strong>{creditsNeeded} carbon credits</strong> to offset your annual emissions.
                          Browse our marketplace to support sustainable projects worldwide.
                        </p>
                      </div>
                      <Link href="/marketplace">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                          Browse Carbon Projects
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Calculate Your Footprint
                  </h3>
                  <p className="text-gray-600">
                    Enter your usage data and click calculate to see your carbon footprint and offset recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Card className="shadow-lg bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Understanding Your Carbon Footprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Average Carbon Footprint</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• US Average: 16 tons CO₂/year</li>
                  <li>• Global Average: 4 tons CO₂/year</li>
                  <li>• Target for 2050: 2 tons CO₂/year</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How to Reduce</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Switch to renewable energy sources</li>
                  <li>• Use public transportation or carpool</li>
                  <li>• Reduce air travel when possible</li>
                  <li>• Improve home energy efficiency</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
