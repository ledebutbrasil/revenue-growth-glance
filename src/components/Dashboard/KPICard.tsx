
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, LineChart } from 'lucide-react';
import { KPIData } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import MiniChart from './MiniChart';

interface KPICardProps {
  data: KPIData;
  onGoalUpdate: (id: string, newGoal: number) => void;
}

const KPICard: React.FC<KPICardProps> = ({ data, onGoalUpdate }) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalValue, setGoalValue] = useState(data.goal.toString());
  
  // Calculate progress percentage based on the KPI type
  const progressPercentage = data.isInverse 
    ? Math.min(Math.round((data.goal / data.value) * 100), 100) 
    : Math.min(Math.round((data.value / data.goal) * 100), 100);

  const isPositiveChange = data.change > 0;
  const changeIndicator = isPositiveChange ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  
  // Determine if the change is good based on whether the KPI is inverse
  const isGoodChange = (isPositiveChange && data.isPositiveGood) || 
                       (!isPositiveChange && !data.isPositiveGood);
  const changeColor = isGoodChange ? "text-brand-primary" : "text-brand-accent";

  // Determine progress color based on percentage
  const getProgressColorClass = () => {
    if (progressPercentage < 30) return "progress-bar-fill-danger";
    if (progressPercentage < 60) return "progress-bar-fill-warning";
    if (progressPercentage < 90) return "progress-bar-fill-info";
    return "progress-bar-fill-good";
  };

  const handleGoalSubmit = () => {
    const newGoal = Number(goalValue);
    if (!isNaN(newGoal) && newGoal > 0) {
      onGoalUpdate(data.id, newGoal);
    } else {
      setGoalValue(data.goal.toString());
    }
    setIsEditingGoal(false);
  };

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  };

  const formattedValue = data.unit === "R$" 
    ? `${data.unit} ${formatValue(data.value)}` 
    : `${formatValue(data.value)}${data.unit}`;

  return (
    <div className="dashboard-card animate-fade-in p-4 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="kpi-label mb-1">{data.name}</h3>
        <div className={`flex items-center text-xs font-medium ${changeColor}`}>
          {changeIndicator}
          <span>{Math.abs(data.change)}%</span>
        </div>
      </div>
      
      <div className="kpi-value mb-3">{formattedValue}</div>
      
      <div className="mt-auto">
        {data.goal !== undefined && (
          <>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progresso</span>
              <div className="flex items-center">
                {isEditingGoal ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleGoalSubmit();
                    }}
                    className="flex items-center"
                  >
                    <Input
                      type="number"
                      value={goalValue}
                      onChange={(e) => setGoalValue(e.target.value)}
                      className="h-6 w-16 p-1 text-xs mr-1"
                      autoFocus
                      onBlur={handleGoalSubmit}
                    />
                    {data.unit}
                  </form>
                ) : (
                  <span 
                    className="cursor-pointer hover:text-gray-300"
                    onClick={() => setIsEditingGoal(true)}
                  >
                    Meta: {data.unit === "R$" ? `${data.unit} ${formatValue(data.goal)}` : `${formatValue(data.goal)}${data.unit}`}
                  </span>
                )}
              </div>
            </div>
            <Progress 
              value={progressPercentage} 
              className={cn(
                "progress-bar h-2",
                progressPercentage >= 100 ? "progress-bar-fill-good" : "progress-bar-fill-bad"
              )}
            />
          </>
        )}
        
        {/* Mini chart for historical data */}
        {data.history && (
          <div className="mt-3 h-20">
            <MiniChart 
              data={data.history} 
              progressPercentage={progressPercentage} 
              isInverse={data.isInverse}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
