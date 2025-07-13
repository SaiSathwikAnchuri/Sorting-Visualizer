
import React from 'react';

interface ArrayVisualizerProps {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
  barColors?: {
    unsorted?: string;
    comparing?: string;
    swapping?: string;
    sorted?: string;
  };
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  comparing,
  swapping,
  sorted = [],
  barColors = {
    unsorted: 'bg-primary',
    comparing: 'bg-yellow-500',
    swapping: 'bg-red-500',
    sorted: 'bg-green-500',
  }
}) => {
  if (!array.length) {
    return (
      <div className="bg-card rounded-lg p-6 border text-center text-muted-foreground">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Array Visualization</h2>
        <p>No array to visualize. Please input an array or generate a random one using the controls.</p>
      </div>
    );
  }

  const maxValue = Math.max(...array);

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return barColors.sorted!;
    if (swapping && swapping.includes(index)) return barColors.swapping!;
    if (comparing && comparing.includes(index)) return barColors.comparing!;
    return barColors.unsorted!;
  };

  const getBarHeight = (value: number) => Math.max((value / maxValue) * 100, 5);
  const getBarWidth = () => Math.max(Math.min(800 / array.length - 2, 60), 8);

  return (
    <div className="bg-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Array Visualization</h2>
      
      <div className="flex items-end justify-center gap-1 h-96 bg-muted/20 rounded p-4 relative overflow-x-auto" role="list" aria-label="Array bars">
        {array.map((value, index) => {
          const barWidth = getBarWidth();
          const barHeight = getBarHeight(value);
          const barColor = getBarColor(index);

          return (
            <div key={index} className="relative flex flex-col items-center min-w-0 shrink-0" role="listitem">
              {/* Value label on top */}
              <div 
                className="text-xs font-bold text-foreground mb-1 text-center bg-background/80 px-1 rounded border"
                style={{ 
                  width: `${Math.max(barWidth, 24)}px`,
                  fontSize: barWidth < 20 ? '9px' : barWidth < 30 ? '10px' : '12px'
                }}
                aria-label={`Value: ${value} at index ${index}`}
              >
                {value}
              </div>
              
              {/* Bar */}
              <div
                className={`transition-all duration-150 rounded-t ${barColor} flex items-end justify-center relative`}
                style={{
                  height: `${barHeight}%`,
                  width: `${barWidth}px`,
                  minHeight: '20px'
                }}
                title={`Index: ${index}, Value: ${value}`}
                aria-label={`Bar for value ${value} at index ${index}`}
              >
                {/* Value inside bar for better visibility */}
                <div 
                  className="text-white font-bold text-center absolute bottom-1"
                  style={{ 
                    fontSize: barWidth < 20 ? '8px' : barWidth < 30 ? '9px' : '10px',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.7)'
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 ${barColors.unsorted} rounded`}></div>
          <span className="text-muted-foreground">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 ${barColors.comparing} rounded`}></div>
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 ${barColors.swapping} rounded`}></div>
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 ${barColors.sorted} rounded`}></div>
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
    </div>
  );
};
