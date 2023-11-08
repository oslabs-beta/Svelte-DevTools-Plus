import React, { useRef } from 'react';
import '../Panel.css';
import TreeComponent from '../PanelComponents/TreeComponent';
import { ComponentPageProps } from '../Panel';

// The page for Step visualization
const StepPage: React.FC<ComponentPageProps> = ({
  rootComponentData,
}: ComponentPageProps) => {
  // const openMap = useRef(new Map());
  // function updateOpenMap(id: number, open: boolean) {
  //   openMap.current.set(id, open);
  // }
  // function getOpen(id: number) {
  //   return openMap.current.get(id);
  // }
  return (
    <div className="pane">
      <>
        <div className="step-page-gap"></div>
        <div data-testid="root-container">
          {rootComponentData && (
            <TreeComponent
              // getOpen={getOpen}
              // updateOpenMap={updateOpenMap}
              componentData={rootComponentData}
              level={1}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default StepPage;
