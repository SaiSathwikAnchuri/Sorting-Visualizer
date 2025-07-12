
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SortingAlgorithm } from '@/types/sorting';
import { BookOpen, Clock, Database } from 'lucide-react';

const algorithmExplanations: Record<SortingAlgorithm, {
  steps: string[];
  pseudocode: string[];
  keyInsights: string[];
}> = {
  mergeSort: {
    steps: [
      "Divide the array into two halves",
      "Recursively sort both halves",
      "Merge the sorted halves back together",
      "Continue until the entire array is sorted"
    ],
    pseudocode: [
      "function mergeSort(arr):",
      "  if arr.length <= 1: return arr",
      "  mid = arr.length / 2",
      "  left = mergeSort(arr[0:mid])",
      "  right = mergeSort(arr[mid:])",
      "  return merge(left, right)"
    ],
    keyInsights: [
      "Stable sorting algorithm",
      "Guaranteed O(n log n) performance",
      "Requires additional memory space",
      "Excellent for large datasets"
    ]
  },
  quickSort: {
    steps: [
      "Choose a pivot element from the array",
      "Partition: rearrange so smaller elements are before pivot",
      "Recursively apply to sub-arrays on both sides",
      "Combine results (no merge needed)"
    ],
    pseudocode: [
      "function quickSort(arr, low, high):",
      "  if low < high:",
      "    pivot = partition(arr, low, high)",
      "    quickSort(arr, low, pivot-1)",
      "    quickSort(arr, pivot+1, high)"
    ],
    keyInsights: [
      "In-place sorting algorithm",
      "Average case: O(n log n)",
      "Worst case: O(n²) if poor pivot choice",
      "Cache-friendly and fast in practice"
    ]
  },
  heapSort: {
    steps: [
      "Build a max heap from the input array",
      "Extract the maximum (root) and place at end",
      "Restore heap property for remaining elements",
      "Repeat until all elements are sorted"
    ],
    pseudocode: [
      "function heapSort(arr):",
      "  buildMaxHeap(arr)",
      "  for i = arr.length-1 to 1:",
      "    swap(arr[0], arr[i])",
      "    heapify(arr, 0, i)"
    ],
    keyInsights: [
      "In-place sorting algorithm",
      "Guaranteed O(n log n) performance",
      "Not stable (equal elements may be reordered)",
      "Excellent worst-case guarantees"
    ]
  },
  radixSort: {
    steps: [
      "Find the maximum number to know digit count",
      "Sort by least significant digit first",
      "Use counting sort for each digit position",
      "Repeat for each digit position"
    ],
    pseudocode: [
      "function radixSort(arr):",
      "  max = findMax(arr)",
      "  for exp = 1; max/exp > 0; exp *= 10:",
      "    countingSort(arr, exp)"
    ],
    keyInsights: [
      "Non-comparative sorting algorithm",
      "Linear time complexity: O(d × n)",
      "Works well for integers with fixed digits",
      "Stable sorting algorithm"
    ]
  },
  selectionSort: {
    steps: [
      "Find the minimum element in unsorted portion",
      "Swap it with the first unsorted element",
      "Move the boundary of sorted portion forward",
      "Repeat until entire array is sorted"
    ],
    pseudocode: [
      "function selectionSort(arr):",
      "  for i = 0 to arr.length-2:",
      "    minIndex = i",
      "    for j = i+1 to arr.length-1:",
      "      if arr[j] < arr[minIndex]:",
      "        minIndex = j",
      "    swap(arr[i], arr[minIndex])"
    ],
    keyInsights: [
      "Simple to understand and implement",
      "O(n²) time complexity in all cases",
      "Minimizes number of swaps",
      "Not stable or adaptive"
    ]
  },
  bubbleSort: {
    steps: [
      "Compare adjacent elements in the array",
      "Swap them if they are in wrong order",
      "Continue through the array multiple times",
      "Stop when no swaps are made in a pass"
    ],
    pseudocode: [
      "function bubbleSort(arr):",
      "  for i = 0 to arr.length-1:",
      "    swapped = false",
      "    for j = 0 to arr.length-2-i:",
      "      if arr[j] > arr[j+1]:",
      "        swap(arr[j], arr[j+1])",
      "        swapped = true",
      "    if not swapped: break"
    ],
    keyInsights: [
      "Simplest sorting algorithm to understand",
      "O(n²) worst and average case",
      "O(n) best case for nearly sorted arrays",
      "Stable but inefficient for large datasets"
    ]
  }
};

interface AlgorithmExplanationProps {
  algorithm: SortingAlgorithm;
  currentStep?: number;
}

export const AlgorithmExplanation: React.FC<AlgorithmExplanationProps> = ({
  algorithm,
  currentStep = 0
}) => {
  const explanation = algorithmExplanations[algorithm];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          How {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Works
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Algorithm Steps:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {explanation.steps.map((step, index) => (
              <li 
                key={index}
                className={`${
                  index === currentStep ? 'text-primary font-medium bg-primary/10 p-1 rounded' : 'text-muted-foreground'
                }`}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Pseudocode:</h4>
          <pre className="bg-muted/20 p-3 rounded text-xs font-mono overflow-x-auto">
            {explanation.pseudocode.join('\n')}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Key Insights:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {explanation.keyInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
