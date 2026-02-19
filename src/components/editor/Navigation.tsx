import FileNavigationItem from './FileNavigationItem';
import LightNavigationItem from './LightNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';
import WidgetNavigationItem from './WidgetNavigationItem';

function Navigation() {
  return (
    <div className="tool-bar">
      <FileNavigationItem />
      <ObjectNavigationItem />
      <LightNavigationItem />
      <WidgetNavigationItem />
    </div>
  );
}

export default Navigation;
