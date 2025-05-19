import { MenuItem } from '@mui/material';
import Objects from '../../data/ObjectNames';
import NavigationItem from './NavigationItem';
import { SceneObject } from '../../types/SceneObject';
import { useEditorContext } from '../../hooks/useEditorContext';
import { downloadJSON } from '../../utils';
import { ChangeEvent, useCallback, useRef } from 'react';
import * as THREE from 'three';
import GenericPrimitive from '../PrimitiveController';
import { SceneObjects } from '../../types/SceneObject';
import GenericGLTF from '../GLTFController';
import FileNavigationItem from './FileNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';

function Navigation() {

  return (
    <div className="tool-bar">
      <FileNavigationItem />
      <ObjectNavigationItem />
    </div>
  );
}

export default Navigation;
