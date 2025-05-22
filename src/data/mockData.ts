
// Mock data for the KPI dashboard
export interface KPIData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  goal: number;
  unit: string;
  change: number;
  isPositiveGood: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ChannelData {
  channel: string;
  leads: number;
  conversion: number;
  cost: number;
  timeToConversion: number;
}

// Mock KPI data
export const kpiData: KPIData[] = [
  {
    id: "total-leads",
    name: "Total de Leads Gerados",
    value: 1254,
    previousValue: 1123,
    goal: 1500,
    unit: "",
    change: 11.7,
    isPositiveGood: true
  },
  {
    id: "new-leads",
    name: "Leads Novos",
    value: 342,
    previousValue: 289,
    goal: 400,
    unit: "",
    change: 18.3,
    isPositiveGood: true
  },
  {
    id: "qualified-leads",
    name: "Total de Leads Qualificados",
    value: 587,
    previousValue: 523,
    goal: 650,
    unit: "",
    change: 12.2,
    isPositiveGood: true
  },
  {
    id: "qualification-rate",
    name: "Taxa de Qualificação",
    value: 46.8,
    previousValue: 42.1,
    goal: 50,
    unit: "%",
    change: 11.2,
    isPositiveGood: true
  },
  {
    id: "qualification-time",
    name: "Tempo Médio de Qualificação",
    value: 3.2,
    previousValue: 3.8,
    goal: 3.0,
    unit: "dias",
    change: -15.8,
    isPositiveGood: false
  },
  {
    id: "lead-to-opportunity",
    name: "Taxa de Conversão (Lead → Opp.)",
    value: 32.4,
    previousValue: 29.8,
    goal: 35,
    unit: "%",
    change: 8.7,
    isPositiveGood: true
  },
  {
    id: "opportunity-to-sale",
    name: "Taxa de Conversão (Opp. → Venda)",
    value: 28.9,
    previousValue: 26.5,
    goal: 30,
    unit: "%",
    change: 9.1,
    isPositiveGood: true
  },
  {
    id: "media-investment",
    name: "Valor Investido em Mídia",
    value: 45000,
    previousValue: 42000,
    goal: 43000,
    unit: "R$",
    change: 7.1,
    isPositiveGood: false
  },
  {
    id: "cost-per-lead",
    name: "Custo por Lead (CPL)",
    value: 35.88,
    previousValue: 37.4,
    goal: 35,
    unit: "R$",
    change: -4.1,
    isPositiveGood: false
  },
  {
    id: "cost-per-qualified-lead",
    name: "Custo por Lead Qualificado",
    value: 76.66,
    previousValue: 80.3,
    goal: 75,
    unit: "R$",
    change: -4.5,
    isPositiveGood: false
  },
  {
    id: "avg-sale-value",
    name: "Valor Médio por Venda",
    value: 12500,
    previousValue: 11800,
    goal: 12000,
    unit: "R$",
    change: 5.9,
    isPositiveGood: true
  },
  {
    id: "revenue",
    name: "Receita Gerada",
    value: 675000,
    previousValue: 589000,
    goal: 700000,
    unit: "R$",
    change: 14.6,
    isPositiveGood: true
  },
  {
    id: "roi",
    name: "Retorno sobre Investimento (ROI)",
    value: 15,
    previousValue: 14,
    goal: 15,
    unit: "x",
    change: 7.1,
    isPositiveGood: true
  }
];

// Mock lead source data
export const leadSourceData: ChartData[] = [
  { name: "Orgânico", value: 378 },
  { name: "Anúncios", value: 452 },
  { name: "Referência", value: 185 },
  { name: "Redes Sociais", value: 194 },
  { name: "Email", value: 45 }
];

// Mock channel performance data
export const channelData: ChannelData[] = [
  {
    channel: "Google Ads",
    leads: 354,
    conversion: 22.5,
    cost: 12500,
    timeToConversion: 8.2
  },
  {
    channel: "Facebook Ads",
    leads: 278,
    conversion: 18.3,
    cost: 9800,
    timeToConversion: 10.5
  },
  {
    channel: "LinkedIn Ads",
    leads: 198,
    conversion: 26.8,
    cost: 8700,
    timeToConversion: 15.3
  },
  {
    channel: "Instagram Ads",
    leads: 156,
    conversion: 17.2,
    cost: 6200,
    timeToConversion: 11.8
  },
  {
    channel: "Email Marketing",
    leads: 89,
    conversion: 12.5,
    cost: 2800,
    timeToConversion: 9.2
  },
  {
    channel: "SEO",
    leads: 179,
    conversion: 19.7,
    cost: 5000,
    timeToConversion: 18.6
  }
];

// Time periods for filtering
export type TimePeriod = "monthly" | "quarterly" | "yearly";

// Helper function to get random data variation for different time periods
export const getFilteredKpiData = (period: TimePeriod): KPIData[] => {
  const variationFactor = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12;
  
  return kpiData.map(kpi => {
    const randomVariation = Math.random() * 0.2 + 0.9; // Random between 0.9 and 1.1
    const newValue = Math.round(kpi.value * randomVariation * variationFactor);
    const newPreviousValue = Math.round(kpi.previousValue * randomVariation * variationFactor);
    const newGoal = Math.round(kpi.goal * variationFactor);
    
    return {
      ...kpi,
      value: newValue,
      previousValue: newPreviousValue,
      goal: newGoal,
      // Recalculate the change percentage
      change: Math.round(((newValue - newPreviousValue) / newPreviousValue) * 1000) / 10
    };
  });
};

export const getFilteredChannelData = (period: TimePeriod): ChannelData[] => {
  const variationFactor = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12;
  
  return channelData.map(channel => {
    const randomVariation = Math.random() * 0.3 + 0.85; // Random between 0.85 and 1.15
    
    return {
      ...channel,
      leads: Math.round(channel.leads * randomVariation * variationFactor),
      conversion: Math.round(channel.conversion * randomVariation * 10) / 10,
      cost: Math.round(channel.cost * randomVariation * variationFactor),
      timeToConversion: Math.round(channel.timeToConversion * randomVariation * 10) / 10
    };
  });
};

export const getFilteredSourceData = (period: TimePeriod): ChartData[] => {
  const variationFactor = period === "monthly" ? 1 : period === "quarterly" ? 3 : 12;
  
  return leadSourceData.map(source => {
    const randomVariation = Math.random() * 0.3 + 0.85; // Random between 0.85 and 1.15
    
    return {
      ...source,
      value: Math.round(source.value * randomVariation * variationFactor)
    };
  });
};
