
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, Plus } from 'lucide-react';

interface ArrayInputProps {
  onArrayChange: (array: number[]) => void;
  disabled: boolean;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  onArrayChange,
  disabled
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const parseArrayInput = (input: string): number[] => {
    try {
      // Remove extra spaces and split by commas, spaces, or semicolons
      const values = input
        .trim()
        .split(/[,\s;]+/)
        .filter(val => val.length > 0)
        .map(val => {
          const num = parseInt(val.trim(), 10);
          if (isNaN(num)) throw new Error(`"${val}" is not a valid number`);
          if (num < 1 || num > 500) throw new Error(`Numbers must be between 1 and 500`);
          return num;
        });

      if (values.length < 2) throw new Error('Please enter at least 2 numbers');
      if (values.length > 100) throw new Error('Maximum 100 numbers allowed');
      
      return values;
    } catch (err) {
      throw err;
    }
  };

  const handleCustomArray = () => {
    try {
      setError('');
      const array = parseArrayInput(inputValue);
      onArrayChange(array);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
    }
  };

  const generatePresetArray = (type: 'random' | 'reversed' | 'nearly-sorted' | 'few-unique') => {
    const size = 20;
    let array: number[] = [];
    
    switch (type) {
      case 'random':
        array = Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 10);
        break;
      case 'reversed':
        array = Array.from({ length: size }, (_, i) => (size - i) * 20);
        break;
      case 'nearly-sorted':
        array = Array.from({ length: size }, (_, i) => i * 20);
        // Swap a few elements to make it nearly sorted
        for (let i = 0; i < 3; i++) {
          const idx1 = Math.floor(Math.random() * size);
          const idx2 = Math.floor(Math.random() * size);
          [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
        break;
      case 'few-unique':
        const values = [50, 100, 150, 200, 250];
        array = Array.from({ length: size }, () => values[Math.floor(Math.random() * values.length)]);
        break;
    }
    
    onArrayChange(array);
    setInputValue(array.join(', '));
    setError('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Array Input
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="array-input">
            Enter numbers (comma or space separated):
          </Label>
          <div className="flex gap-2">
            <Input
              id="array-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
              disabled={disabled}
              className={error ? 'border-red-500' : ''}
            />
            <Button 
              onClick={handleCustomArray}
              disabled={disabled || !inputValue.trim()}
              size="sm"
            >
              Apply
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Quick presets:</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => generatePresetArray('random')}
              disabled={disabled}
              className="flex items-center gap-1"
            >
              <Shuffle className="w-3 h-3" />
              Random
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generatePresetArray('reversed')}
              disabled={disabled}
            >
              Reversed
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generatePresetArray('nearly-sorted')}
              disabled={disabled}
            >
              Nearly Sorted
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generatePresetArray('few-unique')}
              disabled={disabled}
            >
              Few Unique
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
