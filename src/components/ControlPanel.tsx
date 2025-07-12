
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  arraySize: number;
  onPlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onArraySizeChange: (size: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  speed,
  arraySize,
  onPlay,
  onReset,
  onSpeedChange,
  onArraySizeChange
}) => {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Controls</h2>
      
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex gap-2">
          <Button
            onClick={onPlay}
            disabled={isPlaying}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Sorting...' : 'Start Sort'}
          </Button>
          
          <Button
            onClick={onReset}
            disabled={isPlaying}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="speed" className="text-sm font-medium">
            Speed: {speed}ms
          </Label>
          <input
            id="speed"
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            disabled={isPlaying}
            className="w-32"
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
            disabled={isPlaying}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};
