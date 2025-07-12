
import React from 'react';

interface ArrayVisualizerProps {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  comparing,
  swapping,
  sorted = []
}) => {
  const maxValue = Math.max(...array);
  
  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return 'bg-green-500';
    if (swapping && swapping.includes(index)) return 'bg-red-500';
    if (comparing && comparing.includes(index)) return 'bg-yellow-500';
    return 'bg-primary';
  };

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 100;
  };

  const getBarWidth = () => {
    return Math.max(800 / array.length - 2, 2);
  };

  return (
    <div className="bg-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Array Visualization</h2>
      
      <div className="flex items-end justify-center gap-1 h-96 bg-muted/20 rounded p-4 relative">
        {array.map((value, index) => {
          const barWidth = getBarWidth();
          const barHeight = getBarHeight(value);
          
          return (
            <div key={index} className="relative flex flex-col items-center">
              {/* Value label on top */}
              <div 
                className="text-xs font-medium text-foreground mb-1 text-center"
                style={{ 
                  width: `${barWidth}px`, 
                  minWidth: '20px',
                  fontSize: barWidth < 20 ? '8px' : '12px'
                }}
              >
                {value}
              </div>
              
              {/* Bar */}
              <div
                className={`transition-all duration-150 rounded-t ${getBarColor(index)}`}
                style={{
                  height: `${barHeight}%`,
                  width: `${barWidth}px`,
                  minWidth: '2px'
                }}
                title={`Index: ${index}, Value: ${value}`}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-muted-foreground">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
    </div>
  );
};
