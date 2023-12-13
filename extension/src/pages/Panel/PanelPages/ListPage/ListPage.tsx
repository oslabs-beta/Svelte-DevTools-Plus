import React from 'react';
import './ListPage.css';
import TreeComponent from '../../PanelComponents/TreeComponent/TreeComponent';
import { ComponentPageProps } from '../../Panel';

// The page for List visualization
const ListPage: React.FC<ComponentPageProps> = ({
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

export default ListPage;
