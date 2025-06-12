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
