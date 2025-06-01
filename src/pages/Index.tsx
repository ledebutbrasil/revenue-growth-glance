
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { kpiData as fallbackKpiData, leadSourceData as fallbackSourceData, channelData as fallbackChannelData, getFilteredKpiData, getFilteredSourceData, getFilteredChannelData, TimePeriod, KPIData, SalesChannel } from '@/data/mockData';
import { GoogleSheetsConfig } from '@/services/googleSheetsService';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import Header from '@/components/Dashboard/Header';
import KPICard from '@/components/Dashboard/KPICard';
import LeadSourceKPI from '@/components/Dashboard/LeadSourceKPI';
import ChannelTable from '@/components/Dashboard/ChannelTable';
import GoogleSheetsConfigComponent from '@/components/Dashboard/GoogleSheetsConfig';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>('monthly');
  const [activeChannel, setActiveChannel] = useState<SalesChannel | "all">('all');
  const [motivationalQuote, setMotivationalQuote] = useState<string>("Transforme seus leads em oportunidades e suas oportunidades em sucesso!");
  
  // Google Sheets configuration
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState<GoogleSheetsConfig | null>(() => {
    const saved = localStorage.getItem('googleSheetsConfig');
    return saved ? JSON.parse(saved) : null;
  });

  // Use Google Sheets hook
  const { data: googleSheetsData, isLoading, error, refetch, isConfigured } = useGoogleSheets({
    config: googleSheetsConfig,
    enabled: !!googleSheetsConfig,
    refetchInterval: 5 * 60 * 1000 // 5 minutes
  });

  // Fallback data states
  const [fallbackData, setFallbackData] = useState({
    kpis: fallbackKpiData,
    sources: fallbackSourceData,
    channels: fallbackChannelData
  });

  // Update fallback data when period or channel changes
  useEffect(() => {
    setFallbackData({
      kpis: getFilteredKpiData(activePeriod, activeChannel),
      sources: getFilteredSourceData(activePeriod, activeChannel),
      channels: getFilteredChannelData(activePeriod, activeChannel)
    });
  }, [activePeriod, activeChannel]);

  // Create a separate KPI for open opportunities
  const [openOpportunities, setOpenOpportunities] = useState<KPIData>({
    id: "open-opportunities",
    name: "Oportunidades em Aberto",
    value: 57,
    previousValue: 50,
    change: 12.5,
    unit: "",
    opportunityValue: 720000,
    isInverse: false,
    isPositiveGood: true,
    history: [{
      period: "Jan",
      value: 40
    }, {
      period: "Fev",
      value: 45
    }, {
      period: "Mar",
      value: 48
    }, {
      period: "Abr",
      value: 50
    }, {
      period: "Mai",
      value: 54
    }, {
      period: "Jun",
      value: 57
    }]
  });

  // Generate history for periods
  const generateHistoryForPeriod = (period: TimePeriod, currentValue: number): Array<{
    period: string;
    value: number;
  }> => {
    let labels: string[] = [];
    let dataPoints: number[] = [];

    switch (period) {
      case 'daily':
        labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        dataPoints = Array.from({
          length: 7
        }, (_, i) => Math.round(currentValue * 0.7 + currentValue * 0.3 * i / 6 + (Math.random() * 5 - 2.5)));
        break;
      case 'monthly':
        labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
        dataPoints = [40, 45, 48, 50, 54, currentValue];
        break;
      case 'quarterly':
        labels = ["Q1", "Q2", "Q3", "Q4"];
        dataPoints = [Math.round(currentValue * 0.7), Math.round(currentValue * 0.8), Math.round(currentValue * 0.9), currentValue];
        break;
      case 'yearly':
        labels = ["2023", "2024", "2025"];
        dataPoints = [Math.round(currentValue * 0.6), Math.round(currentValue * 0.8), currentValue];
        break;
    }

    return labels.map((label, index) => ({
      period: label,
      value: dataPoints[index]
    }));
  };

  // Update open opportunities based on period/channel
  useEffect(() => {
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
    const opportunityValue = opportunityCount * 12500;

    setOpenOpportunities(prev => ({
      ...prev,
      value: opportunityCount,
      opportunityValue: opportunityValue,
      history: generateHistoryForPeriod(activePeriod, opportunityCount)
    }));
  }, [activePeriod, activeChannel]);

  // Handle config change
  const handleConfigChange = (config: GoogleSheetsConfig) => {
    setGoogleSheetsConfig(config);
    localStorage.setItem('googleSheetsConfig', JSON.stringify(config));
    toast.success('Configuração do Google Sheets salva!');
  };

  // Handle KPI goal updates
  const handleGoalUpdate = (id: string, newGoal: number) => {
    // This would need to update the Google Sheets in a real implementation
    toast.success('Meta atualizada com sucesso', {
      description: `A meta foi atualizada para ${newGoal}`
    });
  };

  // Handle motivational quote change
  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotivationalQuote(e.target.value);
  };

  // Determine which data to use
  const useGoogleSheetsData = isConfigured && !error && googleSheetsData.kpis.length > 0;
  const currentKpis = useGoogleSheetsData ? googleSheetsData.kpis : fallbackData.kpis;
  const currentSources = useGoogleSheetsData ? googleSheetsData.leadSources : fallbackData.sources;
  const currentChannels = useGoogleSheetsData ? googleSheetsData.channels : fallbackData.channels;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden p-4 md:p-6">
      <Header 
        activePeriod={activePeriod} 
        setActivePeriod={setActivePeriod} 
        activeChannel={activeChannel} 
        setActiveChannel={setActiveChannel} 
      />
      
      {/* Google Sheets Configuration */}
      <GoogleSheetsConfigComponent 
        config={googleSheetsConfig}
        onConfigChange={handleConfigChange}
      />

      {/* Data Status */}
      {isConfigured && (
        <div className="mb-4 flex items-center justify-between bg-dark-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 text-brand-primary animate-spin" />
                <span className="text-sm text-gray-300">Carregando dados do Google Sheets...</span>
              </>
            ) : error ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-400">
                  Erro ao carregar dados: {error.message}
                </span>
              </>
            ) : useGoogleSheetsData ? (
              <>
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-400">Dados atualizados do Google Sheets</span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                <span className="text-sm text-yellow-400">Usando dados de exemplo</span>
              </>
            )}
          </div>
          {isConfigured && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          )}
        </div>
      )}
      
      {/* Motivational Quote Section */}
      <div className="mb-6">
        
      </div>
      
      {/* Main grid layout - First 8 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {currentKpis.slice(0, 8).map(kpi => (
          <KPICard key={kpi.id} data={kpi} onGoalUpdate={handleGoalUpdate} />
        ))}
      </div>
      
      {/* Second row - Additional KPIs including Lead Source */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard key={openOpportunities.id} data={openOpportunities} onGoalUpdate={handleGoalUpdate} />
        {currentKpis.slice(8).map(kpi => (
          <KPICard key={kpi.id} data={kpi} onGoalUpdate={handleGoalUpdate} />
        ))}
        <LeadSourceKPI data={currentSources} />
      </div>
      
      {/* Channel performance table */}
      <div className="mb-6">
        <ChannelTable data={currentChannels} />
      </div>
    </div>
  );
};

export default Index;
