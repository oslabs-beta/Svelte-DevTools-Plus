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
        <div className="step-page-gap"></div>
        {rootComponentData && (
          <TreeComponent componentData={rootComponentData} level={1} />
        )}
      </>
    </div>
  );
};

export default StepPage;
