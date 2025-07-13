import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrayVisualizer } from '@/components/ArrayVisualizer';
import { ControlPanel } from '@/components/ControlPanel';
import { AlgorithmPanel } from '@/components/AlgorithmPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { ArrayInput } from '@/components/ArrayInput';
import { AlgorithmExplanation } from '@/components/AlgorithmExplanation';
import { SortedResult } from '@/components/SortedResult';
import { useSortingAlgorithms } from '@/hooks/useSortingAlgorithms';
import { SortingAlgorithm, SortingStats, SortingState, SortingStep } from '@/types/sorting';

const Index = () => {
  const [array, setArray] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('mergeSort');
  const [stats, setStats] = useState<SortingStats>({
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    isComplete: false
  });
  
  const [sortingState, setSortingState] = useState<SortingState>({
    isPlaying: false,
    isPaused: false,
    canStep: false,
    currentStep: 0,
    totalSteps: 0,
    steps: [],
    finalResult: undefined
  });

  const [currentStepData, setCurrentStepData] = useState<SortingStep>({
    array: [],
    comparing: undefined,
    swapping: undefined,
    sorted: []
  });

  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const { generateSteps, resetArray } = useSortingAlgorithms();

  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 400) + 10
    );
    setArray(newArray);
    setOriginalArray([...newArray]);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false });
    setSortingState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      isPaused: false, 
      canStep: false, 
      currentStep: 0, 
      steps: [], 
      finalResult: undefined 
    }));
    setCurrentStepData({ array: newArray, sorted: [] });
  }, [arraySize]);

  const handlePlay = async () => {
    if (sortingState.isPlaying || array.length === 0) return;
    
    const startTime = Date.now();
    let shouldContinue = true;
    
    setSortingState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    
    // Generate all steps first
    const steps = await generateSteps(originalArray, selectedAlgorithm);
    setSortingState(prev => ({ 
      ...prev, 
      steps, 
      totalSteps: steps.length,
      canStep: true 
    }));

    // Play through steps automatically
    for (let i = 0; i < steps.length && shouldContinue; i++) {
      // Check if we should stop
      if (!sortingState.isPlaying) {
        shouldContinue = false;
        break;
      }
      
      const step = steps[i];
      setArray([...step.array]);
      setCurrentStepData(step);
      setSortingState(prev => ({ ...prev, currentStep: i + 1 }));
      
      // Update stats (simplified for demo)
      setStats(prev => ({
        ...prev,
        comparisons: prev.comparisons + (step.comparing ? 1 : 0),
        swaps: prev.swaps + (step.swapping ? 1 : 0),
        timeElapsed: Date.now() - startTime
      }));
      
      await new Promise(resolve => {
        animationRef.current = setTimeout(resolve, Math.max(1001 - (speed * 10), 50));
      });
    }
    
    if (shouldContinue) {
      setSortingState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        finalResult: steps[steps.length - 1]?.array 
      }));
      setStats(prev => ({ ...prev, isComplete: true }));
    }
  };

  const handlePause = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setSortingState(prev => ({ ...prev, isPaused: true, isPlaying: false }));
  };

  const handleStop = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setSortingState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      isPaused: false,
      currentStep: 0 
    }));
    setArray([...originalArray]);
    setCurrentStepData({ array: originalArray, sorted: [] });
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false });
  };

  const handleStep = () => {
    if (sortingState.currentStep < sortingState.totalSteps) {
      const step = sortingState.steps[sortingState.currentStep];
      setArray([...step.array]);
      setCurrentStepData(step);
      setSortingState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      
      if (sortingState.currentStep + 1 === sortingState.totalSteps) {
        setSortingState(prev => ({ 
          ...prev, 
          finalResult: step.array 
        }));
        setStats(prev => ({ ...prev, isComplete: true }));
      }
    }
  };

  const handleReset = () => {
    setArray([...originalArray]);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false });
    setSortingState({
      isPlaying: false,
      isPaused: false,
      canStep: false,
      currentStep: 0,
      totalSteps: 0,
      steps: [],
      finalResult: undefined
    });
    setCurrentStepData({ array: originalArray, sorted: [] });
  };

  const handleCustomArray = (newArray: number[]) => {
    setArray(newArray);
    setOriginalArray([...newArray]);
    setArraySize(newArray.length);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false });
    setSortingState({
      isPlaying: false,
      isPaused: false,
      canStep: false,
      currentStep: 0,
      totalSteps: 0,
      steps: [],
      finalResult: undefined
    });
    setCurrentStepData({ array: newArray, sorted: [] });
  };

  const handleArraySizeChange = (size: number) => {
    setArraySize(size);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleGenerateArray = () => {
    generateRandomArray();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Interactive Sorting Visualizer
          </h1>
          <p className="text-muted-foreground mb-4">
            Step through sorting algorithms with complete control - play, pause, step, and analyze each move
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <ArrayVisualizer 
              array={array} 
              comparing={currentStepData.comparing}
              swapping={currentStepData.swapping}
              sorted={currentStepData.sorted}
            />
            
            <ControlPanel
              isPlaying={sortingState.isPlaying}
              isPaused={sortingState.isPaused}
              canStep={sortingState.canStep}
              speed={speed}
              arraySize={arraySize}
              onPlay={handlePlay}
              onPause={handlePause}
              onStep={handleStep}
              onReset={handleReset}
              onStop={handleStop}
              onSpeedChange={handleSpeedChange}
              onArraySizeChange={handleArraySizeChange}
              onGenerateArray={handleGenerateArray}
              currentStep={sortingState.currentStep}
              totalSteps={sortingState.totalSteps}
            />

            {sortingState.finalResult && (
              <SortedResult 
                originalArray={originalArray}
                sortedArray={sortingState.finalResult}
                algorithm={selectedAlgorithm}
                stats={stats}
              />
            )}
          </div>

          <div className="xl:col-span-2 space-y-6">
            <ArrayInput
              onArrayChange={handleCustomArray}
              disabled={sortingState.isPlaying}
            />
            
            <AlgorithmPanel
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              disabled={sortingState.isPlaying}
            />
            
            <StatsPanel stats={stats} />
            
            <AlgorithmExplanation 
              algorithm={selectedAlgorithm}
              currentStep={currentStepData.stepDescription}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
