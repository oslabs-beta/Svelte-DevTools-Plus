import React from 'react';
import '../Panel.css';
import TreeComponent from '../PanelComponents/TreeComponent';
import { ComponentPageProps } from '../Panel';

// The page for Step visualization
const StepPage: React.FC<ComponentPageProps> = ({
  rootComponentData,
}: ComponentPageProps) => {
  return (
    <div className="pane-content">
      <div id="root-container" data-testid="root-container">
        {rootComponentData && (
          <TreeComponent
            componentData={rootComponentData}
            level={1}
            key={rootComponentData.id}
          />
        )}
      </div>
    </div>
  );
};

export default StepPage;
