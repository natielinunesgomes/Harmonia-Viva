import React from 'react';
import { PromptGenerator } from '../components/PromptGenerator';

const GeneratorPage: React.FC = () => (
  <div className="px-4 py-8 md:px-12 md:py-12 animate-fade-in">
    <PromptGenerator />
  </div>
);

export default GeneratorPage;