
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SortingStats } from '@/types/sorting';
import { BarChart3, ArrowUpDown, Clock, CheckCircle } from 'lucide-react';

interface StatsPanelProps {
  stats: SortingStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Statistics
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted/20 rounded-lg">
            <ArrowUpDown className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-2xl font-bold text-foreground">{stats.comparisons}</span>
            <span className="text-xs text-muted-foreground">Comparisons</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/20 rounded-lg">
            <ArrowUpDown className="w-6 h-6 text-orange-500 mb-1 rotate-90" />
            <span className="text-2xl font-bold text-foreground">{stats.swaps}</span>
            <span className="text-xs text-muted-foreground">Swaps</span>
          </div>
        </div>

        <div className="flex flex-col items-center p-3 bg-muted/20 rounded-lg">
          <Clock className="w-6 h-6 text-green-500 mb-1" />
          <span className="text-2xl font-bold text-foreground">
            {formatTime(stats.timeElapsed)}
          </span>
          <span className="text-xs text-muted-foreground">Time Elapsed</span>
        </div>

        {stats.isComplete && (
          <div className="flex items-center justify-center gap-2 p-3 bg-green-500/20 text-green-700 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Sorting Complete!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
