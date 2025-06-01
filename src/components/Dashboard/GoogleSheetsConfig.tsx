
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Save, Eye, EyeOff } from 'lucide-react';
import { GoogleSheetsConfig } from '@/services/googleSheetsService';

interface GoogleSheetsConfigProps {
  config: GoogleSheetsConfig | null;
  onConfigChange: (config: GoogleSheetsConfig) => void;
}

const GoogleSheetsConfigComponent: React.FC<GoogleSheetsConfigProps> = ({ 
  config, 
  onConfigChange 
}) => {
  const [formData, setFormData] = useState<GoogleSheetsConfig>(
    config || {
      spreadsheetId: '',
      apiKey: '',
      ranges: {
        kpis: 'KPIs!A:I',
        leadSources: 'LeadSources!A:B',
        channels: 'Channels!A:E'
      }
    }
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.spreadsheetId && formData.apiKey) {
      onConfigChange(formData);
      setIsExpanded(false);
    }
  };

  const handleInputChange = (field: keyof GoogleSheetsConfig | string, value: string) => {
    if (field.startsWith('ranges.')) {
      const rangeField = field.split('.')[1] as keyof GoogleSheetsConfig['ranges'];
      setFormData(prev => ({
        ...prev,
        ranges: {
          ...prev.ranges,
          [rangeField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (!isExpanded && config) {
    return (
      <div className="mb-4 flex items-center justify-between bg-dark-100 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-brand-primary" />
          <span className="text-sm text-gray-300">
            Google Sheets conectado: {config.spreadsheetId.slice(0, 10)}...
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsExpanded(true)}
        >
          Configurar
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuração Google Sheets
        </CardTitle>
        <CardDescription>
          Configure a integração com sua planilha do Google Sheets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="spreadsheetId">ID da Planilha</Label>
              <Input
                id="spreadsheetId"
                value={formData.spreadsheetId}
                onChange={(e) => handleInputChange('spreadsheetId', e.target.value)}
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                required
              />
            </div>
            <div>
              <Label htmlFor="apiKey">API Key do Google</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  placeholder="AIzaSyD..."
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="kpisRange">Range KPIs</Label>
              <Input
                id="kpisRange"
                value={formData.ranges.kpis}
                onChange={(e) => handleInputChange('ranges.kpis', e.target.value)}
                placeholder="KPIs!A:I"
              />
            </div>
            <div>
              <Label htmlFor="leadSourcesRange">Range Lead Sources</Label>
              <Input
                id="leadSourcesRange"
                value={formData.ranges.leadSources}
                onChange={(e) => handleInputChange('ranges.leadSources', e.target.value)}
                placeholder="LeadSources!A:B"
              />
            </div>
            <div>
              <Label htmlFor="channelsRange">Range Channels</Label>
              <Input
                id="channelsRange"
                value={formData.ranges.channels}
                onChange={(e) => handleInputChange('ranges.channels', e.target.value)}
                placeholder="Channels!A:E"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Salvar Configuração
            </Button>
            {config && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsExpanded(false)}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-dark-100 rounded-lg text-sm">
          <p className="font-medium mb-2">Estrutura esperada da planilha:</p>
          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
            <li><strong>Aba KPIs:</strong> ID, Nome, Valor, Valor Anterior, Meta, Unidade, Positivo Bom, Inverso, Valor Oportunidade</li>
            <li><strong>Aba LeadSources:</strong> Nome, Valor</li>
            <li><strong>Aba Channels:</strong> Canal, Leads, Conversão, Custo, Tempo Conversão</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsConfigComponent;
