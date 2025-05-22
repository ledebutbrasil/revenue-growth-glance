
import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { KPIData } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface KPICardProps {
  data: KPIData;
  onGoalUpdate: (id: string, newGoal: number) => void;
}

const KPICard: React.FC<KPICardProps> = ({ data, onGoalUpdate }) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalValue, setGoalValue] = useState(data.goal.toString());
  
  const progressPercentage = Math.min(Math.round((data.value / data.goal) * 100), 100);
  const isPositiveChange = data.change > 0;
  const changeIndicator = isPositiveChange ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  const changeColor = (isPositiveChange && data.isPositiveGood) || (!isPositiveChange && !data.isPositiveGood)
    ? "text-brand-primary"
    : "text-brand-accent";

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
          className="progress-bar" 
          indicatorClassName={progressPercentage >= 100 ? "progress-bar-fill progress-bar-fill-good" : "progress-bar-fill progress-bar-fill-bad"} 
        />
      </div>
    </div>
  );
};

export default KPICard;
