
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, ChartBar, Filter } from "lucide-react";
import { TimePeriod } from '@/data/mockData';

interface HeaderProps {
  activePeriod: TimePeriod;
  setActivePeriod: (period: TimePeriod) => void;
}

const Header: React.FC<HeaderProps> = ({ activePeriod, setActivePeriod }) => {
  const periods: { value: TimePeriod; label: string; icon: React.ReactNode }[] = [
    { value: "monthly", label: "Mensal", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { value: "quarterly", label: "Trimestral", icon: <Calendar className="h-4 w-4 mr-1" /> },
    { value: "yearly", label: "Anual", icon: <Calendar className="h-4 w-4 mr-1" /> }
  ];

  return (
    <header className="w-full glassmorphism px-5 py-4 rounded-xl mb-6 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
        <div className="flex items-center">
          <ChartBar className="h-6 w-6 mr-2 text-brand-primary" />
          <h1 className="text-xl font-bold">SalesKPI Dashboard</h1>
        </div>
        
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
      </div>
    </header>
  );
};

export default Header;
