import React from 'react';

interface ShapeVisualizerProps {
  width: number;
  height: number;
  archHeight?: number;
  isArched: boolean;
  horizontalSeparators: number;
  verticalSeparators: number;
}

const ShapeVisualizer: React.FC<ShapeVisualizerProps> = ({ 
  width, 
  height, 
  archHeight = 0, 
  isArched,
  horizontalSeparators,
  verticalSeparators
}) => {
  // Scale factors to fit the shape within the SVG viewport
  const padding = 40; // Padding around the shape
  const maxWidth = 400; // Maximum width of the SVG
  const maxHeight = 400; // Maximum height of the SVG
  
  // Calculate scale factor to fit shape within viewport
  const scaleX = (maxWidth - 2 * padding) / width;
  const scaleY = (maxHeight - 2 * padding) / height;
  const scale = Math.min(scaleX, scaleY);
  
  // Calculate scaled dimensions
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const scaledArchHeight = archHeight * scale;
  
  // Calculate SVG viewBox dimensions
  const viewBoxWidth = maxWidth;
  const viewBoxHeight = maxHeight;
  
  // Calculate center position for the shape
  const startX = (viewBoxWidth - scaledWidth) / 2;
  const startY = (viewBoxHeight - scaledHeight) / 2;

  // For arched shape, calculate the arc path
  const getArchedPath = () => {
    // Calculate the radius of the circle that will form our arch
    // For a circular arch, the radius is: (width/2)² + height² = radius²
    const width = scaledWidth;
    const height = scaledArchHeight;
    const radius = (width * width / 4 + height * height) / (2 * height);
    
    // Build path string using array and join
    return [
      // Start at bottom left
      `M ${startX} ${startY + scaledHeight}`,
      
      // Draw left side up to arch start
      `L ${startX} ${startY + scaledArchHeight}`,
      
      // Draw arch using a circular arc
      `A ${radius} ${radius} 0 0 1 ${startX + scaledWidth} ${startY + scaledArchHeight}`,
      
      // Draw right side and bottom
      `L ${startX + scaledWidth} ${startY + scaledHeight}`,
      
      // Close path
      'Z'
    ].join(' ');
  };

  // Generate separator lines
  const getSeparators = () => {
    const lines = [];
    
    // Horizontal separators
    if (horizontalSeparators > 0) {
      // If arched, adjust the available height for separators
      const availableHeight = isArched ? scaledHeight - scaledArchHeight : scaledHeight;
      const startingY = isArched ? startY + scaledArchHeight : startY;
      
      const spacing = availableHeight / (horizontalSeparators + 1);
      for (let i = 1; i <= horizontalSeparators; i++) {
        const y = startingY + (spacing * i);
        lines.push(
          <line
            key={`h-${i}`}
            x1={startX}
            y1={y}
            x2={startX + scaledWidth}
            y2={y}
            stroke="#60A5FA" // blue-400
            strokeWidth="1.5"
          />
        );
      }
    }
    
    // Vertical separators
    if (verticalSeparators > 0) {
      const spacing = scaledWidth / (verticalSeparators + 1);
      for (let i = 1; i <= verticalSeparators; i++) {
        const x = startX + (spacing * i);
        // Calculate y position on the circular arch
        const relativeX = (x - (startX + scaledWidth / 2)) / (scaledWidth / 2); // -1 to 1
        const topY = startY + scaledArchHeight - 
          (Math.sqrt(1 - relativeX * relativeX) * scaledArchHeight);
        
        lines.push(
          <line
            key={`v-${i}`}
            x1={x}
            y1={isArched ? topY : startY}
            x2={x}
            y2={startY + scaledHeight}
            stroke="#60A5FA" // blue-400
            strokeWidth="1.5"
          />
        );
      }
    }
    
    return lines;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800">
      <h3 className="text-lg font-medium text-white mb-4">Aperçu</h3>
      <div className="relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full max-w-md mx-auto"
        >
          {/* Grid lines */}
          <g className="text-gray-700">
            {Array.from({ length: 20 }, (_, i) => (
              <React.Fragment key={`grid-${i}`}>
                <line
                  x1={i * (viewBoxWidth / 20)}
                  y1="0"
                  x2={i * (viewBoxWidth / 20)}
                  y2={viewBoxHeight}
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1={i * (viewBoxHeight / 20)}
                  x2={viewBoxWidth}
                  y2={i * (viewBoxHeight / 20)}
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}
          </g>

          {/* Shape */}
          {isArched ? (
            <path
              d={getArchedPath()}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          ) : (
            <rect
              x={startX}
              y={startY}
              width={scaledWidth}
              height={scaledHeight}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          )}

          {/* Separators */}
          {getSeparators()}

          {/* Dimensions */}
          <g className="text-xs text-white">
            {/* Width */}
            <line
              x1={startX}
              y1={startY + scaledHeight + 20}
              x2={startX + scaledWidth}
              y2={startY + scaledHeight + 20}
              stroke="currentColor"
              strokeWidth="1"
              markerEnd="url(#arrow)"
              markerStart="url(#arrow)"
            />
            <text
              x={startX + scaledWidth / 2}
              y={startY + scaledHeight + 35}
              textAnchor="middle"
              fill="currentColor"
            >
              {width}"
            </text>

            {/* Height */}
            <line
              x1={startX - 20}
              y1={startY}
              x2={startX - 20}
              y2={startY + scaledHeight}
              stroke="currentColor"
              strokeWidth="1"
              markerEnd="url(#arrow)"
              markerStart="url(#arrow)"
            />
            <text
              x={startX - 35}
              y={startY + scaledHeight / 2}
              textAnchor="middle"
              fill="currentColor"
              transform={`rotate(-90 ${startX - 35} ${startY + scaledHeight / 2})`}
            >
              {height}"
            </text>

            {/* Arch Height */}
            {isArched && (
              <>
                <line
                  x1={startX + scaledWidth / 2}
                  y1={startY + scaledArchHeight}
                  x2={startX + scaledWidth / 2}
                  y2={startY}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4"
                  markerEnd="url(#arrow)"
                />
                <text
                  x={startX + scaledWidth / 2 + 10}
                  y={startY + scaledArchHeight / 2}
                  textAnchor="start"
                  fill="currentColor"
                >
                  {archHeight}"
                </text>
              </>
            )}
          </g>

          {/* Arrow markers */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default ShapeVisualizer; 