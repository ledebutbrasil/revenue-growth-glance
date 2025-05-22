
// Mock data for the KPI dashboard
export interface KPIData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  goal?: number; // Making goal optional with ?
  unit: string;
  change: number;
  isPositiveGood: boolean;
  isInverse?: boolean; // For KPIs where lower is better
  history: Array<{ period: string; value: number; goal?: number }>; // Historical data
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
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 980 },
      { period: "Fev", value: 1040 },
      { period: "Mar", value: 1125 },
      { period: "Abr", value: 1080 },
      { period: "Mai", value: 1190 },
      { period: "Jun", value: 1254, goal: 1500 }
    ]
  },
  {
    id: "new-leads",
    name: "Leads Novos",
    value: 342,
    previousValue: 289,
    goal: 400,
    unit: "",
    change: 18.3,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 225 },
      { period: "Fev", value: 248 },
      { period: "Mar", value: 275 },
      { period: "Abr", value: 295 },
      { period: "Mai", value: 320 },
      { period: "Jun", value: 342, goal: 400 }
    ]
  },
  {
    id: "qualified-leads",
    name: "Total de Leads Qualificados",
    value: 587,
    previousValue: 523,
    goal: 650,
    unit: "",
    change: 12.2,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 420 },
      { period: "Fev", value: 455 },
      { period: "Mar", value: 490 },
      { period: "Abr", value: 510 },
      { period: "Mai", value: 540 },
      { period: "Jun", value: 587, goal: 650 }
    ]
  },
  {
    id: "qualification-rate",
    name: "Taxa de Qualificação",
    value: 46.8,
    previousValue: 42.1,
    goal: 50,
    unit: "%",
    change: 11.2,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 39.8 },
      { period: "Fev", value: 41.2 },
      { period: "Mar", value: 42.7 },
      { period: "Abr", value: 44.1 },
      { period: "Mai", value: 45.3 },
      { period: "Jun", value: 46.8, goal: 50 }
    ]
  },
  {
    id: "qualification-time",
    name: "Tempo Médio de Qualificação",
    value: 3.2,
    previousValue: 3.8,
    goal: 3.0,
    unit: "dias",
    change: -15.8,
    isPositiveGood: false,
    isInverse: true,
    history: [
      { period: "Jan", value: 4.2 },
      { period: "Fev", value: 4.0 },
      { period: "Mar", value: 3.7 },
      { period: "Abr", value: 3.5 },
      { period: "Mai", value: 3.3 },
      { period: "Jun", value: 3.2, goal: 3.0 }
    ]
  },
  {
    id: "lead-to-opportunity",
    name: "Taxa de Conversão (Lead → Opp.)",
    value: 32.4,
    previousValue: 29.8,
    goal: 35,
    unit: "%",
    change: 8.7,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 26.5 },
      { period: "Fev", value: 27.8 },
      { period: "Mar", value: 28.9 },
      { period: "Abr", value: 30.1 },
      { period: "Mai", value: 31.5 },
      { period: "Jun", value: 32.4, goal: 35 }
    ]
  },
  {
    id: "opportunity-to-sale",
    name: "Taxa de Conversão (Opp. → Venda)",
    value: 28.9,
    previousValue: 26.5,
    goal: 30,
    unit: "%",
    change: 9.1,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 24.2 },
      { period: "Fev", value: 25.1 },
      { period: "Mar", value: 26.4 },
      { period: "Abr", value: 27.2 },
      { period: "Mai", value: 27.9 },
      { period: "Jun", value: 28.9, goal: 30 }
    ]
  },
  {
    id: "media-investment",
    name: "Valor Investido em Mídia",
    value: 45000,
    previousValue: 42000,
    goal: 43000,
    unit: "R$",
    change: 7.1,
    isPositiveGood: false,
    isInverse: true,
    history: [
      { period: "Jan", value: 38000 },
      { period: "Fev", value: 39500 },
      { period: "Mar", value: 41000 },
      { period: "Abr", value: 42500 },
      { period: "Mai", value: 43500 },
      { period: "Jun", value: 45000, goal: 43000 }
    ]
  },
  {
    id: "cost-per-lead",
    name: "Custo por Lead (CPL)",
    value: 35.88,
    previousValue: 37.4,
    goal: 35,
    unit: "R$",
    change: -4.1,
    isPositiveGood: false,
    isInverse: true,
    history: [
      { period: "Jan", value: 39.8 },
      { period: "Fev", value: 38.9 },
      { period: "Mar", value: 37.5 },
      { period: "Abr", value: 36.9 },
      { period: "Mai", value: 36.2 },
      { period: "Jun", value: 35.88, goal: 35 }
    ]
  },
  {
    id: "cost-per-qualified-lead",
    name: "Custo por Lead Qualificado",
    value: 76.66,
    previousValue: 80.3,
    goal: 75,
    unit: "R$",
    change: -4.5,
    isPositiveGood: false,
    isInverse: true,
    history: [
      { period: "Jan", value: 88.2 },
      { period: "Fev", value: 85.7 },
      { period: "Mar", value: 82.4 },
      { period: "Abr", value: 80.1 },
      { period: "Mai", value: 78.3 },
      { period: "Jun", value: 76.66, goal: 75 }
    ]
  },
  {
    id: "avg-sale-value",
    name: "Valor Médio por Venda",
    value: 12500,
    previousValue: 11800,
    goal: 12000,
    unit: "R$",
    change: 5.9,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 10900 },
      { period: "Fev", value: 11200 },
      { period: "Mar", value: 11500 },
      { period: "Abr", value: 11800 },
      { period: "Mai", value: 12100 },
      { period: "Jun", value: 12500, goal: 12000 }
    ]
  },
  {
    id: "revenue",
    name: "Receita Gerada",
    value: 675000,
    previousValue: 589000,
    goal: 700000,
    unit: "R$",
    change: 14.6,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 510000 },
      { period: "Fev", value: 540000 },
      { period: "Mar", value: 575000 },
      { period: "Abr", value: 610000 },
      { period: "Mai", value: 645000 },
      { period: "Jun", value: 675000, goal: 700000 }
    ]
  },
  {
    id: "roi",
    name: "Retorno sobre Investimento (ROI)",
    value: 15,
    previousValue: 14,
    goal: 15,
    unit: "x",
    change: 7.1,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 12.9 },
      { period: "Fev", value: 13.3 },
      { period: "Mar", value: 13.8 },
      { period: "Abr", value: 14.2 },
      { period: "Mai", value: 14.6 },
      { period: "Jun", value: 15, goal: 15 }
    ]
  },
  // New KPIs
  {
    id: "new-customer-sales",
    name: "Vendas para Novos Clientes",
    value: 235000,
    previousValue: 210000,
    goal: 250000,
    unit: "R$",
    change: 11.9,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 180000 },
      { period: "Fev", value: 195000 },
      { period: "Mar", value: 205000 },
      { period: "Abr", value: 215000 },
      { period: "Mai", value: 225000 },
      { period: "Jun", value: 235000, goal: 250000 }
    ]
  },
  {
    id: "repurchase-sales",
    name: "Vendas em Recompras",
    value: 440000,
    previousValue: 379000,
    goal: 450000,
    unit: "R$",
    change: 16.1,
    isPositiveGood: true,
    history: [
      { period: "Jan", value: 330000 },
      { period: "Fev", value: 345000 },
      { period: "Mar", value: 370000 },
      { period: "Abr", value: 395000 },
      { period: "Mai", value: 420000 },
      { period: "Jun", value: 440000, goal: 450000 }
    ]
  }
];

// Define sales channels
export type SalesChannel = "distributor" | "endCustomer" | "kreme" | "retail";

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
export type TimePeriod = "daily" | "monthly" | "quarterly" | "yearly";

// Helper function to get data variation for different time periods and channels
export const getFilteredKpiData = (period: TimePeriod, channel: SalesChannel | "all" = "all"): KPIData[] => {
  const variationFactor = getPeriodFactor(period);
  const channelFactor = getChannelFactor(channel);
  
  const filteredData = kpiData.map(kpi => {
    const randomVariation = Math.random() * 0.2 + 0.9; // Random between 0.9 and 1.1
    const newValue = Math.round(kpi.value * randomVariation * variationFactor * channelFactor);
    const newPreviousValue = Math.round(kpi.previousValue * randomVariation * variationFactor * channelFactor);
    const newGoal = Math.round(kpi.goal * variationFactor * channelFactor);
    
    // Generate appropriate historical data based on the period
    const historyData = generateHistoryData(period, kpi, channelFactor);
    
    return {
      ...kpi,
      value: newValue,
      previousValue: newPreviousValue,
      goal: newGoal,
      history: historyData,
      // Recalculate the change percentage
      change: Math.round(((newValue - newPreviousValue) / newPreviousValue) * 1000) / 10
    };
  });
  
  return filteredData;
};

export const getFilteredChannelData = (period: TimePeriod, channel: SalesChannel | "all" = "all"): ChannelData[] => {
  const variationFactor = getPeriodFactor(period);
  const channelFactor = getChannelFactor(channel);
  
  return channelData.map(channel => {
    const randomVariation = Math.random() * 0.3 + 0.85; // Random between 0.85 and 1.15
    
    return {
      ...channel,
      leads: Math.round(channel.leads * randomVariation * variationFactor * channelFactor),
      conversion: Math.round(channel.conversion * randomVariation * 10) / 10,
      cost: Math.round(channel.cost * randomVariation * variationFactor * channelFactor),
      timeToConversion: Math.round(channel.timeToConversion * randomVariation * 10) / 10
    };
  });
};

export const getFilteredSourceData = (period: TimePeriod, channel: SalesChannel | "all" = "all"): ChartData[] => {
  const variationFactor = getPeriodFactor(period);
  const channelFactor = getChannelFactor(channel);
  
  return leadSourceData.map(source => {
    const randomVariation = Math.random() * 0.3 + 0.85; // Random between 0.85 and 1.15
    
    return {
      ...source,
      value: Math.round(source.value * randomVariation * variationFactor * channelFactor)
    };
  });
};

// Helper functions
function getPeriodFactor(period: TimePeriod): number {
  switch (period) {
    case "daily": return 0.033; // ~1/30 of monthly
    case "monthly": return 1;
    case "quarterly": return 3;
    case "yearly": return 12;
  }
}

function getChannelFactor(channel: SalesChannel | "all"): number {
  if (channel === "all") return 1;
  
  // Different channels contribute different percentages to the total
  switch (channel) {
    case "distributor": return 0.4; // 40% of total
    case "endCustomer": return 0.3; // 30% of total
    case "kreme": return 0.2; // 20% of total
    case "retail": return 0.1; // 10% of total
  }
}

function generateHistoryData(period: TimePeriod, kpi: KPIData, channelFactor: number) {
  let labels: string[] = [];
  let dataCount = 0;
  
  // Generate appropriate labels and count based on period
  switch (period) {
    case "daily":
      labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      dataCount = 7;
      break;
    case "monthly":
      labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
      dataCount = 6;
      break;
    case "quarterly":
      labels = ["Q1", "Q2", "Q3", "Q4"];
      dataCount = 4;
      break;
    case "yearly":
      labels = ["2023", "2024", "2025"];
      dataCount = 3;
      break;
  }
  
  // Generate random but trending data
  let historyData: Array<{ period: string; value: number; goal?: number }> = [];
  const finalValue = kpi.value * channelFactor;
  const valueStep = (finalValue - kpi.previousValue * 0.8) / dataCount;
  
  for (let i = 0; i < dataCount; i++) {
    const randomFactor = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
    const value = Math.round((kpi.previousValue * 0.8 + valueStep * i) * randomFactor);
    
    // Only add the goal to the last item
    const dataPoint = {
      period: labels[i],
      value: value
    };
    
    if (i === dataCount - 1) {
      dataPoint.goal = kpi.goal * channelFactor;
    }
    
    historyData.push(dataPoint);
  }
  
  return historyData;
}
