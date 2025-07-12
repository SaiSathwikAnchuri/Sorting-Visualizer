
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SortingAlgorithm, AlgorithmInfo } from '@/types/sorting';

const algorithmInfo: Record<SortingAlgorithm, AlgorithmInfo> = {
  mergeSort: {
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Divide and conquer algorithm that divides the array into halves, sorts them, and merges back.'
  },
  quickSort: {
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    description: 'Picks a pivot element and partitions the array around it recursively.'
  },
  heapSort: {
    name: 'Heap Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    description: 'Uses a binary heap data structure to sort elements in-place.'
  },
  radixSort: {
    name: 'Radix Sort',
    timeComplexity: { best: 'O(d × n)', average: 'O(d × n)', worst: 'O(d × n)' },
    spaceComplexity: 'O(n + k)',
    description: 'Non-comparative algorithm that sorts by individual digits or characters.'
  },
  selectionSort: {
    name: 'Selection Sort',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element and places it at the beginning repeatedly.'
  },
  bubbleSort: {
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them.'
  }
};

interface AlgorithmPanelProps {
  selectedAlgorithm: SortingAlgorithm;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
  disabled: boolean;
}

export const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  disabled
}) => {
  const currentInfo = algorithmInfo[selectedAlgorithm];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sorting Algorithms</CardTitle>
        <CardDescription>Select an algorithm to visualize</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(algorithmInfo).map(([key, info]) => (
            <Button
              key={key}
              variant={selectedAlgorithm === key ? 'default' : 'outline'}
              className="justify-start text-left h-auto p-3"
              onClick={() => onAlgorithmChange(key as SortingAlgorithm)}
              disabled={disabled}
            >
              <div>
                <div className="font-medium">{info.name}</div>
                <div className="text-xs text-muted-foreground">
                  Avg: {info.timeComplexity.average}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">{currentInfo.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{currentInfo.description}</p>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Time Complexity:</span>
              <div className="ml-2 text-muted-foreground">
                <div>Best: {currentInfo.timeComplexity.best}</div>
                <div>Average: {currentInfo.timeComplexity.average}</div>
                <div>Worst: {currentInfo.timeComplexity.worst}</div>
              </div>
            </div>
            <div>
              <span className="font-medium">Space: </span>
              <span className="text-muted-foreground">{currentInfo.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
