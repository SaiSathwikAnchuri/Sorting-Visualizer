
import { useCallback } from 'react';
import { SortingAlgorithm, SortingStats } from '@/types/sorting';

export const useSortingAlgorithms = () => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const mergeSort = async (
    arr: number[],
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void,
    stats: SortingStats = { comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false }
  ): Promise<number[]> => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid), speed, onUpdate, stats);
    const right = await mergeSort(arr.slice(mid), speed, onUpdate, stats);

    const merged = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      stats.comparisons++;
      await sleep(speed);
      
      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }
      
      onUpdate([...merged, ...left.slice(i), ...right.slice(j)], { ...stats });
    }

    return [...merged, ...left.slice(i), ...right.slice(j)];
  };

  const bubbleSort = async (
    arr: number[],
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void
  ) => {
    const array = [...arr];
    const stats: SortingStats = { comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false };

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        stats.comparisons++;
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          stats.swaps++;
        }
        
        onUpdate([...array], { ...stats });
        await sleep(speed);
      }
    }
    
    return array;
  };

  const quickSort = async (
    arr: number[],
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void,
    low: number = 0,
    high: number = arr.length - 1,
    stats: SortingStats = { comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false }
  ): Promise<number[]> => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high, speed, onUpdate, stats);
      await quickSort(arr, speed, onUpdate, low, pivotIndex - 1, stats);
      await quickSort(arr, speed, onUpdate, pivotIndex + 1, high, stats);
    }
    return arr;
  };

  const partition = async (
    arr: number[],
    low: number,
    high: number,
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void,
    stats: SortingStats
  ) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      stats.comparisons++;
      
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        stats.swaps++;
      }
      
      onUpdate([...arr], { ...stats });
      await sleep(speed);
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    stats.swaps++;
    onUpdate([...arr], { ...stats });
    
    return i + 1;
  };

  const selectionSort = async (
    arr: number[],
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void
  ) => {
    const array = [...arr];
    const stats: SortingStats = { comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false };

    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      
      for (let j = i + 1; j < array.length; j++) {
        stats.comparisons++;
        
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
        
        onUpdate([...array], { ...stats });
        await sleep(speed);
      }
      
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        stats.swaps++;
        onUpdate([...array], { ...stats });
      }
    }
    
    return array;
  };

  const heapSort = async (
    arr: number[],
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void
  ) => {
    const array = [...arr];
    const stats: SortingStats = { comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false };
    const n = array.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(array, n, i, speed, onUpdate, stats);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      stats.swaps++;
      
      await heapify(array, i, 0, speed, onUpdate, stats);
      onUpdate([...array], { ...stats });
    }
    
    return array;
  };

  const heapify = async (
    arr: number[],
    n: number,
    i: number,
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void,
    stats: SortingStats
  ) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      stats.comparisons++;
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      stats.comparisons++;
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      stats.swaps++;
      
      onUpdate([...arr], { ...stats });
      await sleep(speed);
      
      await heapify(arr, n, largest, speed, onUpdate, stats);
    }
  };

  const radixSort = async (
    arr: number[],
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void
  ) => {
    const array = [...arr];
    const stats: SortingStats = { comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false };
    
    const max = Math.max(...array);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(array, exp, speed, onUpdate, stats);
    }
    
    return array;
  };

  const countingSort = async (
    arr: number[],
    exp: number,
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void,
    stats: SortingStats
  ) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
      stats.swaps++;
      
      onUpdate([...output.filter(x => x !== undefined)], { ...stats });
      await sleep(speed);
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  };

  const sortArray = useCallback(async (
    array: number[],
    algorithm: SortingAlgorithm,
    speed: number,
    onUpdate: (array: number[], stats: SortingStats) => void
  ) => {
    const arrayCopy = [...array];
    
    switch (algorithm) {
      case 'mergeSort':
        return await mergeSort(arrayCopy, speed, onUpdate);
      case 'quickSort':
        return await quickSort(arrayCopy, speed, onUpdate);
      case 'heapSort':
        return await heapSort(arrayCopy, speed, onUpdate);
      case 'radixSort':
        return await radixSort(arrayCopy, speed, onUpdate);
      case 'selectionSort':
        return await selectionSort(arrayCopy, speed, onUpdate);
      case 'bubbleSort':
        return await bubbleSort(arrayCopy, speed, onUpdate);
      default:
        return arrayCopy;
    }
  }, []);

  const resetArray = useCallback(() => {
    // This will be handled in the main component
  }, []);

  return { sortArray, resetArray };
};
