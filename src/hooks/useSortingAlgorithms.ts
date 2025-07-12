
import { useCallback } from 'react';
import { SortingAlgorithm, SortingStep } from '@/types/sorting';

export const useSortingAlgorithms = () => {
  
  const generateBubbleSortSteps = (arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const sorted: number[] = [];

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        // Comparison step
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          sorted: [...sorted],
          stepDescription: `Comparing elements at positions ${j} and ${j + 1}`
        });
        
        if (array[j] > array[j + 1]) {
          // Swap step
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          steps.push({
            array: [...array],
            swapping: [j, j + 1],
            sorted: [...sorted],
            stepDescription: `Swapping elements at positions ${j} and ${j + 1}`
          });
        }
      }
      sorted.unshift(array.length - 1 - i);
    }
    
    sorted.unshift(0);
    steps.push({
      array: [...array],
      sorted: [...sorted],
      stepDescription: 'Sorting complete!'
    });

    return steps;
  };

  const generateSelectionSortSteps = (arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const sorted: number[] = [];

    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      
      for (let j = i + 1; j < array.length; j++) {
        steps.push({
          array: [...array],
          comparing: [minIndex, j],
          sorted: [...sorted],
          stepDescription: `Finding minimum element, comparing positions ${minIndex} and ${j}`
        });
        
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        steps.push({
          array: [...array],
          swapping: [i, minIndex],
          sorted: [...sorted],
          stepDescription: `Swapping minimum element to position ${i}`
        });
      }
      
      sorted.push(i);
    }
    
    sorted.push(array.length - 1);
    steps.push({
      array: [...array],
      sorted: [...sorted],
      stepDescription: 'Selection sort complete!'
    });

    return steps;
  };

  // Simplified merge sort steps (for demo purposes)
  const generateMergeSortSteps = (arr: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...arr];
    
    // For simplicity, we'll show a basic merge sort visualization
    // In a real implementation, you'd want to show the recursive nature
    const mergeSort = (start: number, end: number) => {
      if (start >= end) return;
      
      const mid = Math.floor((start + end) / 2);
      mergeSort(start, mid);
      mergeSort(mid + 1, end);
      
      merge(start, mid, end);
    };
    
    const merge = (start: number, mid: number, end: number) => {
      const left = array.slice(start, mid + 1);
      const right = array.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;
      
      while (i < left.length && j < right.length) {
        steps.push({
          array: [...array],
          comparing: [k, k],
          stepDescription: `Merging subarrays: comparing ${left[i]} and ${right[j]}`
        });
        
        if (left[i] <= right[j]) {
          array[k] = left[i];
          i++;
        } else {
          array[k] = right[j];
          j++;
        }
        k++;
        
        steps.push({
          array: [...array],
          stepDescription: `Placed element at position ${k - 1}`
        });
      }
      
      while (i < left.length) {
        array[k] = left[i];
        i++;
        k++;
      }
      
      while (j < right.length) {
        array[k] = right[j];
        j++;
        k++;
      }
    };
    
    mergeSort(0, array.length - 1);
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: array.length }, (_, i) => i),
      stepDescription: 'Merge sort complete!'
    });
    
    return steps;
  };

  const generateSteps = useCallback(async (
    array: number[],
    algorithm: SortingAlgorithm
  ): Promise<SortingStep[]> => {
    switch (algorithm) {
      case 'bubbleSort':
        return generateBubbleSortSteps(array);
      case 'selectionSort':
        return generateSelectionSortSteps(array);
      case 'mergeSort':
        return generateMergeSortSteps(array);
      case 'quickSort':
      case 'heapSort':
      case 'radixSort':
        // For demo purposes, use bubble sort steps for other algorithms
        return generateBubbleSortSteps(array);
      default:
        return [];
    }
  }, []);

  const resetArray = useCallback(() => {
    // This will be handled in the main component
  }, []);

  return { generateSteps, resetArray };
};
