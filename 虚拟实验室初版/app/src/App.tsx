// src/App.tsx
import { useState } from 'react';
import { HomePage, CatalogPage, ExperimentPage1, ExperimentPage2 } from '@/pages';

const experimentComponents: Record<string, React.ComponentType<any>> = {
  '1': ExperimentPage1,
  'exp1': ExperimentPage1,
  '2': ExperimentPage2,
  'exp2': ExperimentPage2,
};

type Page = 'home' | 'catalog' | 'experiment';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);

  const handleEnter = () => setCurrentPage('catalog');

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

  const ExperimentComponent = selectedExperiment ? experimentComponents[selectedExperiment] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentPage === 'home' && <HomePage onEnter={handleEnter} />}

      {currentPage === 'catalog' && (
        <CatalogPage
          onSelectExperiment={handleSelectExperiment}
          onBack={handleBackToHome}
        />
      )}

      {currentPage === 'experiment' && ExperimentComponent && (
        <ExperimentComponent onBack={handleBackToCatalog} onHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;