
import React, { useState } from 'react';
import { Calendar, ChartBar, Filter, Edit } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimePeriod, SalesChannel } from '@/data/mockData';

interface HeaderProps {
  activePeriod: TimePeriod;
  setActivePeriod: (period: TimePeriod) => void;
  activeChannel: SalesChannel | "all";
  setActiveChannel: (channel: SalesChannel | "all") => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activePeriod, 
  setActivePeriod,
  activeChannel,
  setActiveChannel
}) => {
  const [quote, setQuote] = useState("O sucesso é a soma de pequenos esforços repetidos dia após dia.");
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [quoteValue, setQuoteValue] = useState(quote);

  const periods: { value: TimePeriod; label: string; icon: React.ReactNode }[] = [
    { value: "daily", label: "Diário", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { value: "monthly", label: "Mensal", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { value: "quarterly", label: "Trimestral", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { value: "yearly", label: "Anual", icon: <Calendar className="h-4 w-4 mr-1" /> }
  ];

  const channels: { value: SalesChannel | "all"; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "distributor", label: "Distribuidor" },
    { value: "endCustomer", label: "Cliente Final" },
    { value: "kreme", label: "Kreme" },
    { value: "retail", label: "Varejo" }
  ];

  const handleQuoteSubmit = () => {
    setQuote(quoteValue);
    setIsEditingQuote(false);
  };

  return (
    <header className="w-full glassmorphism px-5 py-4 rounded-xl mb-6 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 mb-3">
        <div className="flex items-center">
          <ChartBar className="h-6 w-6 mr-2 text-brand-primary" />
          <h1 className="text-xl font-bold">COSMOÉTICA DASHBOARD</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-400 mr-2">Período:</span>
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setActivePeriod(period.value)}
                  className={`filter-button flex items-center ${
                    activePeriod === period.value ? "filter-button-active" : ""
                  }`}
                >
                  {period.icon}
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-400 mr-2">Canal:</span>
            <Select
              value={activeChannel}
              onValueChange={(value) => setActiveChannel(value as SalesChannel | "all")}
            >
              <SelectTrigger className="w-[180px] bg-dark-200 border-dark-100">
                <SelectValue placeholder="Selecione o canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {channels.map((channel) => (
                    <SelectItem key={channel.value} value={channel.value}>
                      {channel.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Motivational Quote Section */}
      <div className="flex items-center justify-center border-t border-dark-100 pt-3">
        {isEditingQuote ? (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleQuoteSubmit();
            }}
            className="flex items-center w-full max-w-2xl"
          >
            <Input
              type="text"
              value={quoteValue}
              onChange={(e) => setQuoteValue(e.target.value)}
              className="bg-dark-100/50 border-dark-100"
              placeholder="Digite uma frase motivacional..."
              autoFocus
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="ml-2"
            >
              Salvar
            </Button>
          </form>
        ) : (
          <div className="flex items-center text-center">
            <p className="text-gray-300 italic text-sm md:text-base">"{quote}"</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditingQuote(true)} 
              className="ml-2 text-gray-400"
            >
              <Edit className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
