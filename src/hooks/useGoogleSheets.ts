
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import GoogleSheetsService, { GoogleSheetsConfig, SheetKPIRow, SheetLeadSourceRow, SheetChannelRow } from '../services/googleSheetsService';
import { KPIData, ChartData, ChannelData, TimePeriod, SalesChannel } from '../data/mockData';

interface UseGoogleSheetsProps {
  config: GoogleSheetsConfig | null;
  enabled?: boolean;
  refetchInterval?: number;
}

interface GoogleSheetsData {
  kpis: KPIData[];
  leadSources: ChartData[];
  channels: ChannelData[];
}

export const useGoogleSheets = ({ 
  config, 
  enabled = true, 
  refetchInterval = 5 * 60 * 1000 // 5 minutes
}: UseGoogleSheetsProps) => {
  const [sheetsService, setSheetsService] = useState<GoogleSheetsService | null>(null);

  useEffect(() => {
    if (config) {
      setSheetsService(new GoogleSheetsService(config));
    }
  }, [config]);

  // Transform sheet data to application format
  const transformKPIData = (sheetKPIs: SheetKPIRow[]): KPIData[] => {
    return sheetKPIs.map(kpi => {
      const change = kpi.previousValue !== 0 
        ? Math.round(((kpi.value - kpi.previousValue) / kpi.previousValue) * 1000) / 10
        : 0;

      // Generate mock history data (in real scenario, this would come from sheets too)
      const history = Array.from({ length: 6 }, (_, i) => ({
        period: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i],
        value: Math.round(kpi.previousValue + (kpi.value - kpi.previousValue) * (i + 1) / 6),
        ...(i === 5 && kpi.goal ? { goal: kpi.goal } : {})
      }));

      return {
        ...kpi,
        change,
        history
      };
    });
  };

  const transformLeadSourceData = (sheetSources: SheetLeadSourceRow[]): ChartData[] => {
    return sheetSources.map(source => ({
      name: source.name,
      value: source.value
    }));
  };

  const transformChannelData = (sheetChannels: SheetChannelRow[]): ChannelData[] => {
    return sheetChannels.map(channel => ({
      channel: channel.channel,
      leads: channel.leads,
      conversion: channel.conversion,
      cost: channel.cost,
      timeToConversion: channel.timeToConversion
    }));
  };

  const fetchAllData = async (): Promise<GoogleSheetsData> => {
    if (!sheetsService) {
      throw new Error('Google Sheets service not initialized');
    }

    const [kpis, leadSources, channels] = await Promise.all([
      sheetsService.fetchKPIs(),
      sheetsService.fetchLeadSources(),
      sheetsService.fetchChannels()
    ]);

    return {
      kpis: transformKPIData(kpis),
      leadSources: transformLeadSourceData(leadSources),
      channels: transformChannelData(channels)
    };
  };

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['googleSheets', config?.spreadsheetId],
    queryFn: fetchAllData,
    enabled: enabled && !!sheetsService && !!config,
    refetchInterval,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });

  return {
    data: data || { kpis: [], leadSources: [], channels: [] },
    isLoading,
    error,
    refetch,
    isConfigured: !!config?.spreadsheetId && !!config?.apiKey
  };
};
