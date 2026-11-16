import InspectorTemplate from './InspectorTemplate';
import { Component, ComponentType } from '@/engine/Component';
import { Entity } from '@/engine/Entity';
import AssetListInspector from './AssetListInspector';
import ScriptHolder from '@/engine/components/ScriptHolder';
import TemplateHolder from '@/engine/components/TemplateHolder';

interface HolderProps<T extends Component> {
  entity: Entity;
  componentType: ComponentType<T>;
}

export default function HoldersInspector<T extends Component>({
  entity,
  componentType,
}: HolderProps<T>) {
  return (
    <InspectorTemplate
      entity={entity}
      componentType={componentType}
      specialRender={(key) => {
        switch (key) {
          case 'scripts':
            return (
              <AssetListInspector
                entity={entity}
                componentType={ScriptHolder}
                listKey="scripts"
                placeholder="Drop script here"
              />
            );
          case 'templates':
            return (
              <AssetListInspector
                entity={entity}
                componentType={TemplateHolder}
                listKey="templates"
                placeholder="Drop template here"
              />
            );
          default:
            return undefined;
        }
      }}
    />
  );
}
