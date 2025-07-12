
import { useState, useEffect, useCallback } from 'react';
import { ArrayVisualizer } from '@/components/ArrayVisualizer';
import { ControlPanel } from '@/components/ControlPanel';
import { AlgorithmPanel } from '@/components/AlgorithmPanel';
import { StatsPanel } from '@/components/StatsPanel';
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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-muted-foreground">
            Watch sorting algorithms come to life with step-by-step visualization
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
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

          <div className="space-y-6">
            <AlgorithmPanel
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              disabled={isPlaying}
            />
            
            <StatsPanel stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
