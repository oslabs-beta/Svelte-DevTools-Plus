import React from "react";
import "../Panel.css";
import TreeComponent from "../PanelComponents/TreeComponent";
import { ComponentPageProps } from "../Panel";

const StepPage: React.FC<ComponentPageProps> = ({
  rootComponentData,
}: ComponentPageProps) => {
  return (
    <div className="pane">
      <>
        <h1>Component Step Page</h1>
        {rootComponentData && (
          <TreeComponent
            component={rootComponentData.component}
            children={rootComponentData.children}
            componentProps={rootComponentData.componentProps}
            componentState={rootComponentData.componentState}
          />
        )}
      </>
    </div>
  );
};

export default StepPage;
