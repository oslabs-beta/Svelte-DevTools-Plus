import React from 'react';
import '../Panel.css';
import TreeComponent from '../PanelComponents/TreeComponent';
import { ComponentPageProps } from '../Panel';

const StepPage: React.FC<ComponentPageProps> = ({
  rootComponentData,
}: ComponentPageProps) => {
  return (
    <div className="pane">
      <>
        <h1>Component Step Page</h1>
        {rootComponentData && (
          <TreeComponent componentData={rootComponentData} />
        )}
      </>
    </div>
  );
};

export default StepPage;
