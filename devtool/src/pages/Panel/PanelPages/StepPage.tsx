import React, { useEffect, useState } from "react";
import "../Panel.css";
import TreeComponent from "../PanelComponents/TreeComponent";

export default function StepPage() {
  const [rootComponent, setRootComponent] = useState(<div></div>);

  useEffect(() => {
    // Sends a message to ContentScriptIsolated, telling it to get the
    // current tab's root component
    async function getRootComponent() {
      // Get the tab the user is on
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      chrome.tabs.sendMessage(tab.id!, { message: "getRootComponent" });
    }
    getRootComponent();
  }, []);

  // Listen for response from ContentScriptIsolated. This is where we
  // get the current tab's root Component, and update StepPage's state
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.type === "returnRootComponent") {
      const rootComponent = message.rootComponent;
      if (message.rootComponent) {
        setRootComponent(
          <TreeComponent
            component={rootComponent.component}
            children={rootComponent.children}
            componentProps={rootComponent.componentProps}
            componentState={rootComponent.componentState}
            level={0}
          />
        );
      } else {
        console.log("Error getting root component");
      }
    }
  });

  return (
    <div className="pane">
      <>
        <h1>Components</h1>
        {rootComponent}
      </>
    </div>
  );
}
