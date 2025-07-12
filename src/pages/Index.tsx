
import { useState, useEffect, useCallback } from 'react';
import { ArrayVisualizer } from '@/components/ArrayVisualizer';
import { ControlPanel } from '@/components/ControlPanel';
import { AlgorithmPanel } from '@/components/AlgorithmPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { ArrayInput } from '@/components/ArrayInput';
import { AlgorithmExplanation } from '@/components/AlgorithmExplanation';
import { useSortingAlgorithms } from '@/hooks/useSortingAlgorithms';
import { SortingAlgorithm, SortingStats } from '@/types/sorting';

const Index = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('mergeSort');
  const [stats, setStats] = useState<SortingStats>({
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    isComplete: false
  });

  const { sortArray, resetArray } = useSortingAlgorithms();

  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 400) + 10
    );
    setArray(newArray);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false });
  }, [arraySize]);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  const handlePlay = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    const startTime = Date.now();
    
    await sortArray(array, selectedAlgorithm, speed, (newArray, newStats) => {
      setArray([...newArray]);
      setStats({
        ...newStats,
        timeElapsed: Date.now() - startTime
      });
    });
    
    setIsPlaying(false);
    setStats(prev => ({ ...prev, isComplete: true }));
  };

  const handleReset = () => {
    if (isPlaying) return;
    resetArray();
    generateRandomArray();
  };

  const handleCustomArray = (newArray: number[]) => {
    if (isPlaying) return;
    setArray(newArray);
    setArraySize(newArray.length);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, isComplete: false });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Interactive Sorting Visualizer
          </h1>
          <p className="text-muted-foreground mb-4">
            Explore sorting algorithms with step-by-step visualization and educational insights
          </p>
          <div className="max-w-4xl mx-auto text-sm text-muted-foreground space-y-2">
            <p>
              🎯 <strong>Custom Input:</strong> Enter your own array or use presets • 
              🔄 <strong>6 Algorithms:</strong> Compare merge, quick, heap, radix, selection, and bubble sort • 
              ⚡ <strong>Live Controls:</strong> Adjust speed, step through, and track performance
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <ArrayVisualizer array={array} />
            
            <ControlPanel
              isPlaying={isPlaying}
              speed={speed}
              arraySize={arraySize}
              onPlay={handlePlay}
              onReset={handleReset}
              onSpeedChange={setSpeed}
              onArraySizeChange={setArraySize}
            />
          </div>

          <div className="xl:col-span-2 space-y-6">
            <ArrayInput
              onArrayChange={handleCustomArray}
              disabled={isPlaying}
            />
            
            <AlgorithmPanel
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              disabled={isPlaying}
            />
            
            <StatsPanel stats={stats} />
            
            <AlgorithmExplanation 
              algorithm={selectedAlgorithm}
            />
          </div>
        </div>

        <footer className="text-center text-sm text-muted-foreground border-t pt-6">
          <p>
            🎓 <strong>Educational Features:</strong> Real-time complexity analysis • Step-by-step explanations • 
            Accessibility-friendly design • Perfect for learning algorithms
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
