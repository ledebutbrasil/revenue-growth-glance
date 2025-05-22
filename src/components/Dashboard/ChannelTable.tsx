
import React from 'react';
import { ChartBar } from 'lucide-react';
import { ChannelData } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ChannelTableProps {
  data: ChannelData[];
}

const ChannelTable: React.FC<ChannelTableProps> = ({ data }) => {
  // Calculate totals for percentage display
  const totalLeads = data.reduce((sum, channel) => sum + channel.leads, 0);
  const totalCost = data.reduce((sum, channel) => sum + channel.cost, 0);
  
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
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">Conversão</TableHead>
              <TableHead className="text-right">Custo</TableHead>
              <TableHead className="text-right">Tempo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((channel) => (
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
