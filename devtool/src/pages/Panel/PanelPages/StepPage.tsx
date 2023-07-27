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
        <h2 className="component-header">Component Step Structure</h2>
        {rootComponentData && (
          <TreeComponent componentData={rootComponentData} />
        )}
      </>
    </div>
  );
};

export default StepPage;
