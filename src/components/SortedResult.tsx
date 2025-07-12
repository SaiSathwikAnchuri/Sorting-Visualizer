
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SortingAlgorithm, SortingStats } from '@/types/sorting';
import { CheckCircle, Copy, ArrowRight } from 'lucide-react';

interface SortedResultProps {
  originalArray: number[];
  sortedArray: number[];
  algorithm: SortingAlgorithm;
  stats: SortingStats;
}

export const SortedResult: React.FC<SortedResultProps> = ({
  originalArray,
  sortedArray,
  algorithm,
  stats
}) => {
  const handleCopyResult = () => {
    navigator.clipboard.writeText(sortedArray.join(', '));
  };

  const algorithmNames = {
    mergeSort: 'Merge Sort',
    quickSort: 'Quick Sort',
    heapSort: 'Heap Sort',
    radixSort: 'Radix Sort',
    selectionSort: 'Selection Sort',
    bubbleSort: 'Bubble Sort'
  };

  return (
    <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <CheckCircle className="w-5 h-5" />
          Sorting Complete!
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <strong>{algorithmNames[algorithm]}</strong> completed in{' '}
          <strong>{stats.timeElapsed}ms</strong> with{' '}
          <strong>{stats.comparisons}</strong> comparisons and{' '}
          <strong>{stats.swaps}</strong> swaps.
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Original Array:</Label>
            <div className="mt-1 p-3 bg-muted/50 rounded border text-sm font-mono">
              [{originalArray.slice(0, 20).join(', ')}{originalArray.length > 20 ? '...' : ''}]
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-green-700 dark:text-green-300">
                Sorted Array:
              </Label>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyResult}
                className="flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </div>
            <div className="mt-1 p-3 bg-green-100 dark:bg-green-900/50 rounded border text-sm font-mono">
              [{sortedArray.slice(0, 20).join(', ')}{sortedArray.length > 20 ? '...' : ''}]
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Array successfully sorted from smallest to largest
        </div>
      </CardContent>
    </Card>
  );
};
