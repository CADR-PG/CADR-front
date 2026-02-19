import FileNavigationItem from './FileNavigationItem';
import LightNavigationItem from './LightNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';
import ViewNavigationItem from './ViewNavigationItem';

function Navigation() {
  return (
    <div className="tool-bar">
      <FileNavigationItem />
      <ObjectNavigationItem />
      <LightNavigationItem />
      <ViewNavigationItem />
    </div>
  );
}

export default Navigation;
