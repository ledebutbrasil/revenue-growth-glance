
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
  
  // Create a separate KPI for open opportunities
  const [openOpportunities, setOpenOpportunities] = useState<KPIData>({
    id: "open-opportunities",
    name: "Oportunidades em Aberto",
    value: 57,
    change: 12.5,
    unit: "",
    isInverse: false,
    isPositiveGood: true
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
    
    setOpenOpportunities(prev => ({
      ...prev,
      value: Math.round(baseValue * multiplier)
    }));
  }, [activePeriod, activeChannel]);
  
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
      
      {/* Second row - Lead sources and additional KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1">
          <LeadSourceChart data={sourceData} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add Open Opportunities KPI card */}
          <KPICard key={openOpportunities.id} data={openOpportunities} onGoalUpdate={handleGoalUpdate} />
          {kpiData.slice(8).map(kpi => (
            <KPICard key={kpi.id} data={kpi} onGoalUpdate={handleGoalUpdate} />
          ))}
        </div>
      </div>
      
      {/* Channel performance table */}
      <div className="mb-6">
        <ChannelTable data={channelData} />
      </div>
    </div>
  );
};

export default Index;
