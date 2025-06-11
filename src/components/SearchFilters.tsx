
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Search } from 'lucide-react';

export interface FilterState {
  search: string;
  banks: string[];
  cardTypes: string[];
  annualFeeRange: [number, number];
  minSalaryRange: [number, number];
  loungeAccess: boolean | null;
  fuelSurcharge: boolean | null;
  categories: string[];
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBanks: string[];
  availableCategories: string[];
}

export const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  availableBanks, 
  availableCategories 
}: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardTypes = ['entry-level', 'mid-tier', 'premium', 'super-premium'];

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'banks' | 'cardTypes' | 'categories', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      banks: [],
      cardTypes: [],
      annualFeeRange: [0, 100000],
      minSalaryRange: [0, 3000000],
      loungeAccess: null,
      fuelSurcharge: null,
      categories: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.banks.length > 0) count++;
    if (filters.cardTypes.length > 0) count++;
    if (filters.loungeAccess !== null) count++;
    if (filters.fuelSurcharge !== null) count++;
    if (filters.categories.length > 0) count++;
    if (filters.annualFeeRange[0] > 0 || filters.annualFeeRange[1] < 100000) count++;
    if (filters.minSalaryRange[0] > 0 || filters.minSalaryRange[1] < 3000000) count++;
    return count;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search credit cards..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-1">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-6">
            {/* Banks */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Banks</Label>
              <div className="grid grid-cols-1 gap-2">
                {availableBanks.map((bank) => (
                  <div key={bank} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bank-${bank}`}
                      checked={filters.banks.includes(bank)}
                      onCheckedChange={() => toggleArrayFilter('banks', bank)}
                    />
                    <Label htmlFor={`bank-${bank}`} className="text-sm">
                      {bank}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Types */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Card Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {cardTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.cardTypes.includes(type)}
                      onCheckedChange={() => toggleArrayFilter('cardTypes', type)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                      {type.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual Fee Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Annual Fee Range: {formatCurrency(filters.annualFeeRange[0])} - {formatCurrency(filters.annualFeeRange[1])}
              </Label>
              <Slider
                value={filters.annualFeeRange}
                onValueChange={(value) => updateFilter('annualFeeRange', value as [number, number])}
                max={100000}
                step={1000}
                className="mt-2"
              />
            </div>

            {/* Minimum Salary Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Minimum Salary: {formatCurrency(filters.minSalaryRange[0])} - {formatCurrency(filters.minSalaryRange[1])}
              </Label>
              <Slider
                value={filters.minSalaryRange}
                onValueChange={(value) => updateFilter('minSalaryRange', value as [number, number])}
                max={3000000}
                step={50000}
                className="mt-2"
              />
            </div>

            {/* Special Features */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lounge-access"
                    checked={filters.loungeAccess === true}
                    onCheckedChange={(checked) => 
                      updateFilter('loungeAccess', checked ? true : null)
                    }
                  />
                  <Label htmlFor="lounge-access" className="text-sm">
                    Airport Lounge Access
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fuel-waiver"
                    checked={filters.fuelSurcharge === false}
                    onCheckedChange={(checked) => 
                      updateFilter('fuelSurcharge', checked ? false : null)
                    }
                  />
                  <Label htmlFor="fuel-waiver" className="text-sm">
                    Fuel Surcharge Waiver
                  </Label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleArrayFilter('categories', category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
