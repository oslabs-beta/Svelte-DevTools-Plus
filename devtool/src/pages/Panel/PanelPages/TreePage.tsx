import React from "react";
import { ComponentPageProps } from "../Panel";

const TreePage: React.FC<ComponentPageProps> = ({
  rootComponentData,
}: ComponentPageProps) => {
  return (
    <div className="pane">
      <>
        <h1>Component Tree Page</h1>
        {rootComponentData && <div>Tree gets rendered here</div>}
      </>
    </div>
  );
};

export default TreePage;
