import { MenuItem } from '@mui/material';
import NavigationItem from './NavigationItem';
import { useEditorContext } from '../../hooks/useEditorContext';
import Widget from '../../data/WidgetNames';

function WidgetNavigationItem() {
  const { focus } = useEditorContext();

  const handleWidgetOpen = (widget: string) => {
    focus(widget);
  };

  return (
    <NavigationItem label="Widgets">
      {Object.keys(Widget).map((object) => (
        <MenuItem key={object} onClick={() => handleWidgetOpen(object)}>
          {object}
        </MenuItem>
      ))}
    </NavigationItem>
  );
}

export default WidgetNavigationItem;
