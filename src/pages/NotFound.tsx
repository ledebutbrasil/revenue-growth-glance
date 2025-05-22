
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-300 p-4">
      <div className="dashboard-card p-8 max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-brand-primary">404</h1>
        <p className="text-xl text-white mb-6">Página não encontrada</p>
        <a href="/" className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/80 transition-colors">
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
