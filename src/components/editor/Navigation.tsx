import BackToDashboardButton from './BackToDashboardButton';
import FileNavigationItem from './FileNavigationItem';
import LightNavigationItem from './LightNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';
import ThemeToggle from '../ThemeToggle';
import ParticleNavigationItem from './ParticleNavigationItem';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import StartStopBtnToolbar from './StartStopBtnToolbar';

function Navigation() {
  return (
    <div className="tool-bar">
      <div className="tool-bar--left">
        <BackToDashboardButton />
        <FileNavigationItem />
        <ObjectNavigationItem />
        <LightNavigationItem />
        <ParticleNavigationItem />
      </div>
      <div className="tool-bar--center">
        <PlayButton />
        <PauseButton />
        <StartStopBtnToolbar />
      </div>
      <div className="tool-bar--right">
        <ThemeToggle className="tool-bar__theme-toggle" />
      </div>
    </div>
  );
}

export default Navigation;
