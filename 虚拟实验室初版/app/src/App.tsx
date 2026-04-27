import { useState } from 'react';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { ExperimentPage } from '@/pages/ExperimentPage';

type Page = 'home' | 'catalog' | 'experiment';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);

  const handleEnter = () => {
    setCurrentPage('catalog');
  };

  const handleSelectExperiment = (id: string) => {
    setSelectedExperiment(id);
    setCurrentPage('experiment');
  };

  const handleBackToCatalog = () => {
    setCurrentPage('catalog');
    setSelectedExperiment(null);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedExperiment(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentPage === 'home' && (
        <HomePage onEnter={handleEnter} />
      )}
      
      {currentPage === 'catalog' && (
        <CatalogPage 
          onSelectExperiment={handleSelectExperiment}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === 'experiment' && selectedExperiment && (
        <ExperimentPage 
          experimentId={selectedExperiment}
          onBack={handleBackToCatalog}
          onHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
