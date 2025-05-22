
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  kpiData as initialKpiData,
  leadSourceData as initialSourceData,
  channelData as initialChannelData,
  getFilteredKpiData,
  getFilteredSourceData,
  getFilteredChannelData,
  TimePeriod,
  KPIData,
  SalesChannel
} from '@/data/mockData';
import Header from '@/components/Dashboard/Header';
import KPICard from '@/components/Dashboard/KPICard';
import LeadSourceChart from '@/components/Dashboard/LeadSourceChart';
import ChannelTable from '@/components/Dashboard/ChannelTable';

const Index = () => {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>('monthly');
  const [activeChannel, setActiveChannel] = useState<SalesChannel | "all">('all');
  const [kpiData, setKpiData] = useState(initialKpiData);
  const [sourceData, setSourceData] = useState(initialSourceData);
  const [channelData, setChannelData] = useState(initialChannelData);
  
  // Create a separate KPI for open opportunities with all required KPIData properties
  const [openOpportunities, setOpenOpportunities] = useState<KPIData>({
    id: "open-opportunities",
    name: "Oportunidades em Aberto",
    value: 57,
    previousValue: 50,
    change: 12.5,
    unit: "",
    goal: undefined, // Explicitly setting as undefined
    isInverse: false,
    isPositiveGood: true,
    opportunityValue: 720000, // Adding the total value of opportunities
    history: [
      { period: "Jan", value: 40 },
      { period: "Fev", value: 45 },
      { period: "Mar", value: 48 },
      { period: "Abr", value: 50 },
      { period: "Mai", value: 54 },
      { period: "Jun", value: 57 }
    ]
  });
  
  // Update data when period or channel changes
  useEffect(() => {
    setKpiData(getFilteredKpiData(activePeriod, activeChannel));
    setSourceData(getFilteredSourceData(activePeriod, activeChannel));
    setChannelData(getFilteredChannelData(activePeriod, activeChannel));
    
    // Update open opportunities based on period/channel
    // In a real app, this would come from the backend
    const baseValue = 57;
    let multiplier = 1;
    
    if (activeChannel !== 'all') {
      if (activeChannel === 'distributor') multiplier = 1.5;
      else if (activeChannel === 'endCustomer') multiplier = 0.8;
      else if (activeChannel === 'kreme') multiplier = 1.2;
      else if (activeChannel === 'retail') multiplier = 0.9;
    }
    
    if (activePeriod === 'daily') multiplier *= 0.2;
    else if (activePeriod === 'quarterly') multiplier *= 3;
    else if (activePeriod === 'yearly') multiplier *= 12;
    
    const opportunityCount = Math.round(baseValue * multiplier);
    // Calculate a weighted opportunity value based on the count
    const opportunityValue = opportunityCount * 12500; // Average opportunity value of R$12,500
    
    setOpenOpportunities(prev => ({
      ...prev,
      value: opportunityCount,
      opportunityValue: opportunityValue,
      // Also update history data based on period
      history: generateHistoryForPeriod(activePeriod, opportunityCount)
    }));
  }, [activePeriod, activeChannel]);
  
  // Helper function to generate appropriate history data based on period
  const generateHistoryForPeriod = (period: TimePeriod, currentValue: number): Array<{ period: string; value: number }> => {
    let labels: string[] = [];
    let dataPoints: number[] = [];
    
    // Generate labels and data points based on period
    switch(period) {
      case 'daily':
        labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        // Generate slightly random but trending data
        dataPoints = Array.from({ length: 7 }, (_, i) => 
          Math.round(currentValue * 0.7 + (currentValue * 0.3 * i / 6) + (Math.random() * 5 - 2.5))
        );
        break;
      case 'monthly':
        labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
        dataPoints = [40, 45, 48, 50, 54, currentValue];
        break;
      case 'quarterly':
        labels = ["Q1", "Q2", "Q3", "Q4"];
        dataPoints = [Math.round(currentValue * 0.7), Math.round(currentValue * 0.8), 
                     Math.round(currentValue * 0.9), currentValue];
        break;
      case 'yearly':
        labels = ["2023", "2024", "2025"];
        dataPoints = [Math.round(currentValue * 0.6), Math.round(currentValue * 0.8), currentValue];
        break;
    }
    
    // Combine labels and data points
    return labels.map((label, index) => ({
      period: label,
      value: dataPoints[index]
    }));
  };
  
  // Handle KPI goal updates
  const handleGoalUpdate = (id: string, newGoal: number) => {
    setKpiData(prevData => 
      prevData.map(kpi => 
        kpi.id === id ? { ...kpi, goal: newGoal } : kpi
      )
    );
    
    toast.success('Meta atualizada com sucesso', {
      description: `A meta foi atualizada para ${newGoal}`
    });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden p-4 md:p-6">
      <Header 
        activePeriod={activePeriod} 
        setActivePeriod={setActivePeriod} 
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      
      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.slice(0, 8).map(kpi => (
          <KPICard key={kpi.id} data={kpi} onGoalUpdate={handleGoalUpdate} />
        ))}
      </div>
      
      {/* Second row - Additional KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Add Open Opportunities KPI card */}
        <KPICard key={openOpportunities.id} data={openOpportunities} onGoalUpdate={handleGoalUpdate} />
        {kpiData.slice(8).map(kpi => (
          <KPICard key={kpi.id} data={kpi} onGoalUpdate={handleGoalUpdate} />
        ))}
      </div>
      
      {/* Lead sources chart - Moved to its own row */}
      <div className="mb-6">
        <LeadSourceChart data={sourceData} />
      </div>
      
      {/* Channel performance table */}
      <div className="mb-6">
        <ChannelTable data={channelData} />
      </div>
    </div>
  );
};

export default Index;
