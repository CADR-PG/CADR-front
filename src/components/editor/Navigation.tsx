import FileNavigationItem from './FileNavigationItem';
import LightNavigationItem from './LightNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';
import ThemeToggle from '../ThemeToggle';

function Navigation() {
  return (
    <div className="tool-bar">
      <FileNavigationItem />
      <ObjectNavigationItem />
      <LightNavigationItem />
      <ThemeToggle className="tool-bar__theme-toggle" />
    </div>
  );
}

export default Navigation;
