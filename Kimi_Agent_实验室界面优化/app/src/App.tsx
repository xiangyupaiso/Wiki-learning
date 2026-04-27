import { useState } from 'react';
import type { ViewType, Experiment, InfoTabType } from '@/types';
import { getAllExperiments } from '@/data/experiments';
import HomePage from '@/sections/HomePage';
import CatalogPage from '@/sections/CatalogPage';
import ExperimentPage from '@/sections/ExperimentPage';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentInfoTab, setCurrentInfoTab] = useState<InfoTabType>('steps');

  const experiments = getAllExperiments();

  const handleEnterExperiment = () => {
    setCurrentView('catalog');
  };

  const handleSelectExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setCurrentInfoTab('steps');
    setCurrentView('experiment');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedExperiment(null);
  };

  const handleInfoTabChange = (tab: InfoTabType) => {
    setCurrentInfoTab(tab);
    if (tab === 'catalog') {
      setCurrentView('catalog');
      setSelectedExperiment(null);
    } else if (selectedExperiment) {
      if (tab === 'steps') {
        setCurrentView('experiment');
      } else if (tab === 'instruments') {
        setCurrentView('instruments');
      } else if (tab === 'principle') {
        setCurrentView('principle');
      } else if (tab === 'safety') {
        setCurrentView('safety');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {currentView === 'home' && (
        <HomePage onEnterExperiment={handleEnterExperiment} />
      )}
      
      {currentView === 'catalog' && (
        <CatalogPage 
          experiments={experiments}
          onSelectExperiment={handleSelectExperiment}
          onBackToHome={handleBackToHome}
        />
      )}
      
      {(currentView === 'experiment' || currentView === 'instruments' || currentView === 'principle' || currentView === 'safety') && selectedExperiment && (
        <ExperimentPage
          experiment={selectedExperiment}
          currentView={currentView}
          currentInfoTab={currentInfoTab}
          onBackToHome={handleBackToHome}
          onInfoTabChange={handleInfoTabChange}
        />
      )}
    </div>
  );
}

export default App;
