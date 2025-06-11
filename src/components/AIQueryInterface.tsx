
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Sparkles, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QueryResult {
  query: string;
  results: string[];
  summary: string;
  timestamp: Date;
}

interface AIQueryInterfaceProps {
  onQueryResults: (cardIds: string[]) => void;
}

export const AIQueryInterface = ({ onQueryResults }: AIQueryInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<QueryResult[]>([]);
  const { toast } = useToast();

  const sampleQueries = [
    "Show me cards that offer lounge access and high cashback on fuel",
    "Best credit cards for first-time users with no annual fee",
    "Compare Axis Magnus vs HDFC Regalia with benefits summary",
    "Cards with highest reward points for online shopping",
    "Premium cards under ₹10,000 annual fee with travel benefits"
  ];

  const handleQuery = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    try {
      // Simulate AI processing with intelligent card matching
      const result = await processAIQuery(query);
      
      setQueryHistory(prev => [result, ...prev]);
      onQueryResults(result.results);
      setQuery('');
      
      toast({
        title: "Query Processed",
        description: `Found ${result.results.length} matching cards`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processAIQuery = async (userQuery: string): Promise<QueryResult> => {
    // Simple keyword-based matching logic (in real app, this would call OpenAI)
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    const query_lower = userQuery.toLowerCase();
    let matchedCards: string[] = [];
    let summary = '';

    // Lounge access queries
    if (query_lower.includes('lounge')) {
      matchedCards = ['hdfc-regalia', 'axis-magnus', 'sbi-elite', 'amex-platinum-travel', 'kotak-white-reserve'];
      summary = 'Found premium cards with airport lounge access benefits. All cards offer domestic lounge access with varying international access.';
    }
    
    // No annual fee queries
    else if (query_lower.includes('no annual fee') || query_lower.includes('free')) {
      matchedCards = ['icici-amazon-pay'];
      summary = 'Found lifetime free credit cards with excellent cashback benefits. Perfect for first-time users.';
    }
    
    // First-time user queries
    else if (query_lower.includes('first-time') || query_lower.includes('beginner')) {
      matchedCards = ['icici-amazon-pay', 'sbi-elite'];
      summary = 'Entry-level cards with lower income requirements and good benefits for building credit history.';
    }
    
    // Comparison queries
    else if (query_lower.includes('axis magnus') && query_lower.includes('hdfc regalia')) {
      matchedCards = ['axis-magnus', 'hdfc-regalia'];
      summary = 'Axis Magnus offers higher reward rates and unlimited domestic lounge access but has a higher annual fee. HDFC Regalia provides excellent value with good rewards and travel benefits at a lower fee.';
    }
    
    // Fuel cashback queries
    else if (query_lower.includes('fuel')) {
      matchedCards = ['hdfc-regalia', 'axis-magnus', 'sbi-elite', 'kotak-white-reserve'];
      summary = 'Cards offering fuel surcharge waiver and additional rewards on fuel transactions.';
    }
    
    // Online shopping queries
    else if (query_lower.includes('online') || query_lower.includes('shopping')) {
      matchedCards = ['icici-amazon-pay', 'axis-magnus', 'kotak-white-reserve'];
      summary = 'Best cards for online shopping with high cashback rates and reward points on e-commerce platforms.';
    }
    
    // Premium cards under budget
    else if (query_lower.includes('premium') && query_lower.includes('10000')) {
      matchedCards = ['hdfc-regalia', 'sbi-elite'];
      summary = 'Premium cards under ₹10,000 annual fee offering excellent travel benefits and reward rates.';
    }
    
    // Default fallback
    else {
      matchedCards = ['hdfc-regalia', 'axis-magnus', 'icici-amazon-pay'];
      summary = 'Here are some popular credit cards that might match your requirements. Consider your spending patterns and income for the best choice.';
    }

    return {
      query: userQuery,
      results: matchedCards,
      summary,
      timestamp: new Date()
    };
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Card Discovery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Query Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about credit cards in natural language..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
            className="flex-1"
          />
          <Button onClick={handleQuery} disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Sample Queries */}
        {queryHistory.length === 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Try these sample queries:</p>
            <div className="grid gap-2">
              {sampleQueries.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto p-2 text-xs"
                  onClick={() => handleSampleQuery(sample)}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Query History */}
        {queryHistory.length > 0 && (
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {queryHistory.map((result, index) => (
                <div key={index} className="border rounded-lg p-3 bg-muted/50">
                  <div className="flex items-start gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{result.query}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    <p className="text-sm text-muted-foreground">{result.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {result.results.map((cardId) => (
                        <Badge key={cardId} variant="secondary" className="text-xs">
                          {cardId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
