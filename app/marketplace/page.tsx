"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Search, MapPin, Award, TrendingUp, CircleCheck as CheckCircle, Leaf } from 'lucide-react';
import { carbonProjects, CarbonProject } from '@/lib/data';

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(null);
  const [credits, setCredits] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredProjects = carbonProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || project.projectType === filterType;
    return matchesSearch && matchesType;
  });

  const projectTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'reforestation', label: 'Reforestation' },
    { value: 'renewable_energy', label: 'Renewable Energy' },
    { value: 'ocean_conservation', label: 'Ocean Conservation' },
    { value: 'sustainable_agriculture', label: 'Sustainable Agriculture' },
  ];

  const handlePurchase = (project: CarbonProject, creditsAmount: number) => {
    const total = project.pricePerCredit * creditsAmount;
    alert(`Purchase Confirmed!\n\nProject: ${project.name}\nCredits: ${creditsAmount}\nTotal: $${total.toFixed(2)}\n\nThank you for supporting climate action!`);
    setSelectedProject(null);
    setCredits(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Carbon Credit Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support verified climate projects and offset your carbon footprint
          </p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search projects or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {filteredProjects.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      hoveredCard === project.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-white text-gray-900 shadow-md">
                      {project.verificationStandard}
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-600 text-white shadow-md">
                      {project.projectType.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <div className="text-3xl font-bold text-emerald-600">
                          ${project.pricePerCredit}
                        </div>
                        <div className="text-xs text-gray-600">per credit</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {(project.creditsAvailable - project.creditsSold).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">credits left</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">CO₂ Offset</span>
                        <span className="font-medium">{project.co2OffsetPerCredit} ton/credit</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Sold</span>
                        <span className="font-medium">{project.creditsSold.toLocaleString()} credits</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => setSelectedProject(project)}
                        >
                          Purchase Credits
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{project.name}</DialogTitle>
                          <DialogDescription>
                            Purchase carbon credits to offset your footprint
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="credits">Number of Credits</Label>
                            <Input
                              id="credits"
                              type="number"
                              min="1"
                              value={credits}
                              onChange={(e) => setCredits(parseInt(e.target.value) || 1)}
                            />
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Price per credit:</span>
                              <span className="font-medium">${project.pricePerCredit}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Credits:</span>
                              <span className="font-medium">{credits}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">CO₂ Offset:</span>
                              <span className="font-medium">{(credits * project.co2OffsetPerCredit).toFixed(2)} tons</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold">
                              <span>Total:</span>
                              <span className="text-emerald-600">${(project.pricePerCredit * credits).toFixed(2)}</span>
                            </div>
                          </div>

                          <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => handlePurchase(project, credits)}
                          >
                            Confirm Purchase
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Verified Standards</h3>
              <p className="text-sm text-gray-600">
                All projects certified by VCS, Gold Standard, or CAR
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Real Impact</h3>
              <p className="text-sm text-gray-600">
                Track your offset contribution with transparent reporting
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Certificate</h3>
              <p className="text-sm text-gray-600">
                Receive your carbon offset certificate immediately
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
