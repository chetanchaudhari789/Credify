
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCardGrid } from '@/components/CreditCardGrid';
import { SearchFilters, FilterState } from '@/components/SearchFilters';
import { AIQueryInterface } from '@/components/AIQueryInterface';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { creditCardsData, CreditCard } from '@/data/creditCards';
import { Sparkles, TrendingUp, Shield, CreditCard as CreditCardIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    banks: [],
    cardTypes: [],
    annualFeeRange: [0, 100000],
    minSalaryRange: [0, 3000000],
    loungeAccess: null,
    fuelSurcharge: null,
    categories: []
  });
  
  const [compareList, setCompareList] = useState<string[]>([]);
  const [aiFilteredCards, setAiFilteredCards] = useState<string[]>([]);

  // Get unique values for filter options
  const availableBanks = [...new Set(creditCardsData.map(card => card.bank))];
  const availableCategories = [...new Set(creditCardsData.flatMap(card => card.categories))];

  // Filter cards based on current filters
  const filteredCards = useMemo(() => {
    let cards = creditCardsData;

    // Apply AI query filter first if active
    if (aiFilteredCards.length > 0) {
      cards = cards.filter(card => aiFilteredCards.includes(card.id));
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      cards = cards.filter(card => 
        card.name.toLowerCase().includes(searchLower) ||
        card.bank.toLowerCase().includes(searchLower) ||
        card.description.toLowerCase().includes(searchLower) ||
        card.benefits.some(benefit => benefit.toLowerCase().includes(searchLower))
      );
    }

    // Bank filter
    if (filters.banks.length > 0) {
      cards = cards.filter(card => filters.banks.includes(card.bank));
    }

    // Card type filter
    if (filters.cardTypes.length > 0) {
      cards = cards.filter(card => filters.cardTypes.includes(card.type));
    }

    // Annual fee range filter
    cards = cards.filter(card => 
      card.annualFee >= filters.annualFeeRange[0] && 
      card.annualFee <= filters.annualFeeRange[1]
    );

    // Minimum salary range filter
    cards = cards.filter(card => 
      card.minSalary >= filters.minSalaryRange[0] && 
      card.minSalary <= filters.minSalaryRange[1]
    );

    // Lounge access filter
    if (filters.loungeAccess !== null) {
      cards = cards.filter(card => card.loungeAccess === filters.loungeAccess);
    }

    // Fuel surcharge filter
    if (filters.fuelSurcharge !== null) {
      cards = cards.filter(card => !card.fuelSurcharge === filters.fuelSurcharge);
    }

    // Categories filter
    if (filters.categories.length > 0) {
      cards = cards.filter(card => 
        filters.categories.some(category => card.categories.includes(category))
      );
    }

    return cards;
  }, [filters, aiFilteredCards]);

  const handleCompare = (card: CreditCard) => {
    if (compareList.includes(card.id)) {
      setCompareList(prev => prev.filter(id => id !== card.id));
      toast({
        title: "Removed from comparison",
        description: `${card.name} removed from comparison list`,
      });
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, card.id]);
      toast({
        title: "Added to comparison",
        description: `${card.name} added to comparison list`,
      });
    } else {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 cards at once",
        variant: "destructive",
      });
    }
  };

  const handleAIQueryResults = (cardIds: string[]) => {
    setAiFilteredCards(cardIds);
    // Clear other filters when AI query is used
    setFilters({
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

  const clearAIFilter = () => {
    setAiFilteredCards([]);
  };

  const compareCards = compareList.map(id => 
    creditCardsData.find(card => card.id === id)!
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CreditCardIcon className="w-8 h-8 text-primary" />
              <Badge variant="secondary" className="px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Find Your Perfect Credit Card
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the best credit card offers from major Indian banks with AI-powered natural language search and smart comparisons.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Real-time offers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Trusted comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <AIQueryInterface onQueryResults={handleAIQueryResults} />
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableBanks={availableBanks}
              availableCategories={availableCategories}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {aiFilteredCards.length > 0 ? 'AI Search Results' : 'All Credit Cards'}
                </h2>
                <p className="text-muted-foreground">
                  Showing {filteredCards.length} of {creditCardsData.length} cards
                </p>
              </div>
              
              {aiFilteredCards.length > 0 && (
                <Button variant="outline" onClick={clearAIFilter}>
                  Clear AI Filter
                </Button>
              )}
            </div>

            {/* Cards Grid */}
            <CreditCardGrid
              cards={filteredCards}
              onCompare={handleCompare}
              compareList={compareList}
            />

            {filteredCards.length === 0 && (
              <div className="text-center py-16">
                <CreditCardIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No cards found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}

            {/* Comparison Panel */}
            <ComparisonPanel
              cards={compareCards}
              onRemoveCard={(cardId) => setCompareList(prev => prev.filter(id => id !== cardId))}
              onClearAll={() => setCompareList([])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
