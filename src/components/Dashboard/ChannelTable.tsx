
import React, { useState } from 'react';
import { ChartBar, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { ChannelData } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ChannelTableProps {
  data: ChannelData[];
}

type SortField = 'leads' | 'conversion' | 'cost' | 'timeToConversion';
type SortDirection = 'asc' | 'desc';

const ChannelTable: React.FC<ChannelTableProps> = ({ data: initialData }) => {
  const [sortField, setSortField] = useState<SortField>('leads');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Sort data
  const sortedData = [...initialData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  });
  
  // Calculate totals for percentage display
  const totalLeads = sortedData.reduce((sum, channel) => sum + channel.leads, 0);
  const totalCost = sortedData.reduce((sum, channel) => sum + channel.cost, 0);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const getLeadPercentage = (leads: number) => {
    return ((leads / totalLeads) * 100).toFixed(1) + '%';
  };
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new sort field
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-3 w-3 ml-1" /> : 
      <ArrowDown className="h-3 w-3 ml-1" />;
  };
  
  return (
    <div className="dashboard-card h-full overflow-hidden">
      <div className="p-4 border-b border-dark-100 flex items-center">
        <ChartBar className="h-4 w-4 text-brand-primary mr-2" />
        <h3 className="text-base font-medium text-white">Performance por Canal</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Canal</TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('leads')}>
                <div className="flex items-center justify-end">
                  Leads <SortIcon field="leads" />
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('conversion')}>
                <div className="flex items-center justify-end">
                  Conversão <SortIcon field="conversion" />
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('cost')}>
                <div className="flex items-center justify-end">
                  Custo <SortIcon field="cost" />
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('timeToConversion')}>
                <div className="flex items-center justify-end">
                  Tempo Médio <SortIcon field="timeToConversion" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((channel) => (
              <TableRow key={channel.channel} className="hover:bg-dark-100/50">
                <TableCell className="font-medium">{channel.channel}</TableCell>
                <TableCell className="text-right">
                  <div>{channel.leads}</div>
                  <div className="text-xs text-gray-400">{getLeadPercentage(channel.leads)}</div>
                </TableCell>
                <TableCell className="text-right">{channel.conversion}%</TableCell>
                <TableCell className="text-right">
                  <div>{formatCurrency(channel.cost)}</div>
                  <div className="text-xs text-gray-400">{formatCurrency(channel.cost / channel.leads)}/lead</div>
                </TableCell>
                <TableCell className="text-right">{channel.timeToConversion} dias</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ChannelTable;
