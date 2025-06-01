
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ChartData } from '@/data/mockData';

interface LeadSourceKPIProps {
  data: ChartData[];
}

const LeadSourceKPI: React.FC<LeadSourceKPIProps> = ({ data }) => {
  const totalLeads = data.reduce((sum, source) => sum + source.value, 0);
  const topSource = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  
  return (
    <div className="dashboard-card animate-fade-in p-4 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="kpi-label mb-1">Origem dos Leads</h3>
        <BarChart3 className="h-4 w-4 text-brand-primary" />
      </div>
      
      <div className="kpi-value mb-3">{totalLeads}</div>
      
      <div className="text-sm text-gray-300 mb-3">
        Principal: {topSource.name} ({topSource.value})
      </div>
      
      <div className="mt-auto space-y-1">
        {data.slice(0, 3).map((source, index) => {
          const percentage = (source.value / totalLeads) * 100;
          return (
            <div key={source.name} className="flex items-center justify-between text-xs">
              <span className="text-gray-400 truncate flex-1">{source.name}</span>
              <div className="flex items-center ml-2">
                <div className="w-12 h-1.5 bg-gray-600 rounded-full mr-1">
                  <div 
                    className="h-full bg-brand-primary rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-gray-300 w-8 text-right">{source.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadSourceKPI;
