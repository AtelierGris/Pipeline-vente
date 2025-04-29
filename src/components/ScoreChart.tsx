import React from 'react';
import { ScoreDimensions } from '../types/lead';

interface ScoreChartProps {
  dimensions: ScoreDimensions;
  className?: string;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ dimensions, className = '' }) => {
  // Calculate the total score
  const total = Object.values(dimensions).reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0);
  
  // Normalize the scores to ensure they add up to 1
  const normalizedDimensions = {
    monetary: total === 0 ? 0 : dimensions.monetary / total,
    logistics: total === 0 ? 0 : dimensions.logistics / total,
    risk: total === 0 ? 0 : dimensions.risk / total,
    addedValue: total === 0 ? 0 : dimensions.addedValue / total
  };

  const dimensionColors = {
    monetary: '#0066FF',
    logistics: '#4B9EFF',
    risk: '#99CCFF',
    addedValue: '#CCE5FF'
  };

  const dimensionLabels = {
    monetary: 'Valeur Monétaire',
    logistics: 'Logistique',
    risk: 'Risque',
    addedValue: 'Valeur Ajoutée'
  };

  const getPercentage = (value: number) => {
    if (isNaN(value) || total === 0) return '0.0';
    return (value * 100).toFixed(1);
  };

  let cumulativePercentage = 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={`${className} space-y-6`}>
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {Object.entries(normalizedDimensions).map(([key, value]) => {
            const percentage = isNaN(value) ? 0 : value * 100;
            const offset = cumulativePercentage;
            cumulativePercentage += percentage;

            return (
              <circle
                key={key}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={dimensionColors[key as keyof ScoreDimensions]}
                strokeWidth="20"
                strokeDasharray={`${circumference * (percentage / 100)} ${circumference}`}
                strokeDashoffset={`${circumference * (offset / 100)}`}
                transform="rotate(-90 50 50)"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-normal text-gray-900">
              {isNaN(total) ? 0 : Math.round(total * 100)}
            </div>
            <div className="text-sm text-gray-500">Score Total</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-normal text-gray-700 uppercase tracking-wide">Détails du Score</h3>
        <div className="grid gap-4">
          {Object.entries(dimensions).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 border border-gray-200">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 mr-2"
                  style={{ backgroundColor: dimensionColors[key as keyof ScoreDimensions] }}
                />
                <span className="text-sm text-gray-600">
                  {dimensionLabels[key as keyof ScoreDimensions]}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-normal text-gray-900">
                  {getPercentage(normalizedDimensions[key as keyof ScoreDimensions])}%
                </div>
                <div className="text-xs text-gray-500">
                  Score: {(isNaN(value) ? 0 : value * 100).toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreChart; 