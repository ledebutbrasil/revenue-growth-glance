
// Google Sheets API service
export interface GoogleSheetsConfig {
  spreadsheetId: string;
  apiKey: string;
  ranges: {
    kpis: string;
    leadSources: string;
    channels: string;
  };
}

export interface SheetKPIRow {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  goal?: number;
  unit: string;
  isPositiveGood: boolean;
  isInverse?: boolean;
  opportunityValue?: number;
}

export interface SheetLeadSourceRow {
  name: string;
  value: number;
}

export interface SheetChannelRow {
  channel: string;
  leads: number;
  conversion: number;
  cost: number;
  timeToConversion: number;
}

class GoogleSheetsService {
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  private async fetchSheetData(range: string): Promise<any[][]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${range}?key=${this.config.apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.values || [];
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  }

  async fetchKPIs(): Promise<SheetKPIRow[]> {
    const rows = await this.fetchSheetData(this.config.ranges.kpis);
    
    // Skip header row
    return rows.slice(1).map(row => ({
      id: row[0] || '',
      name: row[1] || '',
      value: parseFloat(row[2]) || 0,
      previousValue: parseFloat(row[3]) || 0,
      goal: row[4] ? parseFloat(row[4]) : undefined,
      unit: row[5] || '',
      isPositiveGood: row[6] === 'TRUE' || row[6] === true,
      isInverse: row[7] === 'TRUE' || row[7] === true,
      opportunityValue: row[8] ? parseFloat(row[8]) : undefined,
    }));
  }

  async fetchLeadSources(): Promise<SheetLeadSourceRow[]> {
    const rows = await this.fetchSheetData(this.config.ranges.leadSources);
    
    // Skip header row
    return rows.slice(1).map(row => ({
      name: row[0] || '',
      value: parseFloat(row[1]) || 0,
    }));
  }

  async fetchChannels(): Promise<SheetChannelRow[]> {
    const rows = await this.fetchSheetData(this.config.ranges.channels);
    
    // Skip header row
    return rows.slice(1).map(row => ({
      channel: row[0] || '',
      leads: parseFloat(row[1]) || 0,
      conversion: parseFloat(row[2]) || 0,
      cost: parseFloat(row[3]) || 0,
      timeToConversion: parseFloat(row[4]) || 0,
    }));
  }
}

export default GoogleSheetsService;
