
export type SortingAlgorithm = 
  | 'mergeSort'
  | 'quickSort'
  | 'heapSort'
  | 'radixSort'
  | 'selectionSort'
  | 'bubbleSort';

export interface SortingStats {
  comparisons: number;
  swaps: number;
  timeElapsed: number;
  isComplete: boolean;
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}

export interface SortingStep {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
}
