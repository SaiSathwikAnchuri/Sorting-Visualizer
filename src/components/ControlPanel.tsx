
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Play, Pause, SkipForward, RotateCcw, Shuffle } from 'lucide-react';

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
  onGenerateArray: () => void;
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
  onArraySizeChange,
  onGenerateArray
}) => {
  const handleSpeedChange = (values: number[]) => {
    onSpeedChange(values[0]);
  };

  const handleArraySizeChange = (values: number[]) => {
    onArraySizeChange(values[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Playback Controls */}
        <div className="flex gap-2">
          <Button
            onClick={isPlaying ? onPause : onPlay}
            disabled={false}
            className="flex-1"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
          
          <Button
            onClick={onStep}
            disabled={!canStep || isPlaying}
            variant="outline"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Step
          </Button>
          
          <Button
            onClick={onReset}
            disabled={isPlaying}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button
            onClick={onGenerateArray}
            disabled={isPlaying}
            variant="outline"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>

        {/* Progress */}
        {totalSteps > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">
              Progress: {currentStep} / {totalSteps}
            </Label>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Speed Control */}
        <div className="space-y-2">
          <Label className="text-sm">Animation Speed: {101 - speed}ms</Label>
          <Slider
            value={[speed]}
            onValueChange={handleSpeedChange}
            min={1}
            max={100}
            step={1}
            disabled={isPlaying}
          />
        </div>

        {/* Array Size Control */}
        <div className="space-y-2">
          <Label className="text-sm">Array Size: {arraySize}</Label>
          <Slider
            value={[arraySize]}
            onValueChange={handleArraySizeChange}
            min={5}
            max={100}
            step={1}
            disabled={isPlaying}
          />
        </div>
      </CardContent>
    </Card>
  );
};
