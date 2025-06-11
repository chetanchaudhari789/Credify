
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, bankLogos, categoryIcons } from '@/data/creditCards';
import { Star, MapPin, CreditCard as CreditCardIcon, Gift, Shield } from 'lucide-react';

interface CreditCardGridProps {
  cards: CreditCard[];
  onCompare: (card: CreditCard) => void;
  compareList: string[];
}

export const CreditCardGrid = ({ cards, onCompare, compareList }: CreditCardGridProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCardTypeColor = (type: string) => {
    switch (type) {
      case 'super-premium': return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'premium': return 'bg-gradient-to-r from-blue-600 to-indigo-600';
      case 'mid-tier': return 'bg-gradient-to-r from-green-600 to-teal-600';
      case 'entry-level': return 'bg-gradient-to-r from-orange-500 to-red-500';
      default: return 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card 
          key={card.id} 
          className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
            hoveredCard === card.id ? 'ring-2 ring-primary' : ''
          }`}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Card Visual Header */}
          <div className={`h-32 ${getCardTypeColor(card.type)} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute top-4 left-4 text-white">
              <div className="text-2xl">{bankLogos[card.bank]}</div>
              <div className="text-sm font-medium opacity-90">{card.bank}</div>
            </div>
            <div className="absolute top-4 right-4 text-white">
              <CreditCardIcon className="w-8 h-8" />
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-lg font-bold">{card.name}</div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>{card.rating}</span>
              </div>
            </div>
          </div>

          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant="secondary" className="capitalize">
                {card.type}
              </Badge>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Annual Fee</div>
                <div className="font-bold">
                  {card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee)}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {card.description}
            </p>

            {/* Key Benefits */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-primary" />
                <span className="font-medium">{card.rewardRate}</span>
              </div>
              
              {card.loungeAccess && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Airport Lounge Access</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Min Salary: {formatCurrency(card.minSalary)}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {card.categories.slice(0, 3).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {categoryIcons[category]} {category}
                </Badge>
              ))}
              {card.categories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{card.categories.length - 3} more
                </Badge>
              )}
            </div>

            {/* Welcome Bonus */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">Welcome Bonus</div>
              <div className="font-medium text-sm">{card.welcomeBonus}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onCompare(card)}
                disabled={compareList.includes(card.id) && compareList.length >= 3}
              >
                {compareList.includes(card.id) ? 'Added to Compare' : 'Compare'}
              </Button>
              <Button size="sm" className="flex-1">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
