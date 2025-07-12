
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCcw, SkipForward, StepForward } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  isPaused: boolean;
  canStep: boolean;
  speed: number;
  arraySize: number;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onArraySizeChange: (size: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  isPaused,
  canStep,
  speed,
  arraySize,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  onArraySizeChange
}) => {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Controls</h2>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            onClick={isPlaying ? onPause : onPlay}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button
            onClick={onStep}
            disabled={!canStep || isPlaying || currentStep >= totalSteps}
            variant="outline"
            className="flex items-center gap-2"
          >
            <StepForward className="w-4 h-4" />
            Step
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {totalSteps > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{currentStep} / {totalSteps} steps</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="speed" className="text-sm font-medium">
              Speed: {speed}ms
            </Label>
            <input
              id="speed"
              type="range"
              min="10"
              max="1000"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              disabled={isPlaying}
              className="w-full"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="size" className="text-sm font-medium">
              Array Size: {arraySize}
            </Label>
            <input
              id="size"
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => onArraySizeChange(Number(e.target.value))}
              disabled={isPlaying || canStep}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
