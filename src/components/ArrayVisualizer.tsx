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
        <p>No array to visualize. Please input or generate an array.</p>
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

  const getBarHeight = (value: number) => (value / maxValue) * 100;
  const getBarWidth = () => Math.max(800 / array.length - 2, 2);

  return (
    <div className="bg-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Array Visualization</h2>
      
      <div className="flex items-end justify-center gap-1 h-96 bg-muted/20 rounded p-4 relative" role="list" aria-label="Array bars">
        {array.map((value, index) => {
          const barWidth = getBarWidth();
          const barHeight = getBarHeight(value);
          const barColor = getBarColor(index);

          return (
            <div key={index} className="relative flex flex-col items-center" role="listitem">
              {/* Value label on top */}
              <div 
                className="text-xs font-medium text-foreground mb-1 text-center"
                style={{ 
                  width: `${barWidth}px`, 
                  minWidth: '20px',
                  fontSize: barWidth < 20 ? '8px' : '12px'
                }}
                aria-label={`Value: ${value} at index ${index}`}
              >
                {value}
              </div>
              
              {/* Bar */}
              <div
                className={`transition-all duration-150 rounded-t ${barColor}`}
                style={{
                  height: `${barHeight}%`,
                  width: `${barWidth}px`,
                  minWidth: '2px'
                }}
                title={`Index: ${index}, Value: ${value}`}
                aria-label={`Bar for value ${value} at index ${index}`}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center gap-6 mt-4 text-sm">
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
