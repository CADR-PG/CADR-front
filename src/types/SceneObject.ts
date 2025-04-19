import React, { JSX, ReactElement } from "react";
import ControllerProps from "./ControllerProps";

interface SceneObject {
  id: string;
  geometryType?: string;
  component: ReactElement<any, any>
}

export default SceneObject;
