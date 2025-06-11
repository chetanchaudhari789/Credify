
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, GitCompare, Star, MapPin, Gift, Shield, CreditCard as CreditCardIcon } from 'lucide-react';
import { CreditCard, bankLogos } from '@/data/creditCards';

interface ComparisonPanelProps {
  cards: CreditCard[];
  onRemoveCard: (cardId: string) => void;
  onClearAll: () => void;
}

export const ComparisonPanel = ({ cards, onRemoveCard, onClearAll }: ComparisonPanelProps) => {
  if (cards.length === 0) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getComparisonMetrics = () => {
    return [
      { 
        key: 'annualFee' as const, 
        label: 'Annual Fee', 
        getValue: (card: CreditCard) => formatCurrency(card.annualFee)
      },
      { 
        key: 'joiningFee' as const, 
        label: 'Joining Fee', 
        getValue: (card: CreditCard) => formatCurrency(card.joiningFee)
      },
      { 
        key: 'rewardRate' as const, 
        label: 'Reward Rate', 
        getValue: (card: CreditCard) => card.rewardRate
      },
      { 
        key: 'welcomeBonus' as const, 
        label: 'Welcome Bonus', 
        getValue: (card: CreditCard) => card.welcomeBonus
      },
      { 
        key: 'minSalary' as const, 
        label: 'Min Salary', 
        getValue: (card: CreditCard) => formatCurrency(card.minSalary)
      },
      { 
        key: 'rating' as const, 
        label: 'Rating', 
        getValue: (card: CreditCard) => `${card.rating}/5`
      }
    ];
  };

  const getBooleanFeatures = () => [
    { key: 'loungeAccess' as keyof CreditCard, label: 'Lounge Access', icon: MapPin },
    { key: 'fuelSurcharge' as keyof CreditCard, label: 'Fuel Surcharge Waiver', icon: Gift, invert: true }
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-primary" />
            Compare Cards ({cards.length}/3)
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="min-w-max">
            {/* Card Headers */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${cards.length}, 280px)` }}>
              <div className="font-medium text-muted-foreground">Credit Cards</div>
              {cards.map((card) => (
                <div key={card.id} className="relative">
                  <Card className="h-32 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${card.color === '#1e40af' ? 'from-blue-600 to-indigo-600' : 
                      card.color === '#dc2626' ? 'from-red-600 to-pink-600' :
                      card.color === '#f97316' ? 'from-orange-500 to-red-500' :
                      card.color === '#059669' ? 'from-green-600 to-teal-600' :
                      card.color === '#6366f1' ? 'from-purple-600 to-pink-600' :
                      'from-blue-600 to-cyan-600'} relative`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:bg-white/20"
                        onClick={() => onRemoveCard(card.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="absolute top-4 left-4 text-white">
                        <div className="text-lg">{bankLogos[card.bank]}</div>
                        <div className="text-xs opacity-90">{card.bank}</div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="font-bold text-sm">{card.name}</div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{card.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-1">
              {getComparisonMetrics().map((metric) => (
                <div key={metric.key} className="grid gap-4 py-3 border-b" style={{ gridTemplateColumns: `200px repeat(${cards.length}, 280px)` }}>
                  <div className="font-medium text-sm">{metric.label}</div>
                  {cards.map((card) => (
                    <div key={card.id} className="text-sm">
                      {metric.getValue(card)}
                    </div>
                  ))}
                </div>
              ))}

              {/* Boolean Features */}
              {getBooleanFeatures().map((feature) => (
                <div key={feature.key} className="grid gap-4 py-3 border-b" style={{ gridTemplateColumns: `200px repeat(${cards.length}, 280px)` }}>
                  <div className="font-medium text-sm flex items-center gap-2">
                    <feature.icon className="w-4 h-4" />
                    {feature.label}
                  </div>
                  {cards.map((card) => (
                    <div key={card.id} className="text-sm">
                      {feature.invert 
                        ? (!card[feature.key] ? '✅ Yes' : '❌ No')
                        : (card[feature.key] ? '✅ Yes' : '❌ No')
                      }
                    </div>
                  ))}
                </div>
              ))}

              {/* Benefits Comparison */}
              <div className="grid gap-4 py-3 border-b" style={{ gridTemplateColumns: `200px repeat(${cards.length}, 280px)` }}>
                <div className="font-medium text-sm">Key Benefits</div>
                {cards.map((card) => (
                  <div key={card.id} className="text-sm space-y-1">
                    {card.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="text-xs p-1 bg-muted rounded">
                        {benefit}
                      </div>
                    ))}
                    {card.benefits.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{card.benefits.length - 3} more benefits
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div className="grid gap-4 py-3" style={{ gridTemplateColumns: `200px repeat(${cards.length}, 280px)` }}>
                <div className="font-medium text-sm">Best For</div>
                {cards.map((card) => (
                  <div key={card.id} className="flex flex-wrap gap-1">
                    {card.categories.slice(0, 3).map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
