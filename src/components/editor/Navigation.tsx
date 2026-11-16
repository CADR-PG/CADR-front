import FileNavigationItem from './FileNavigationItem';
import LightNavigationItem from './LightNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';
import ParticleNavigationItem from './ParticleNavigationItem';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import StartStopBtnToolbar from './StartStopBtnToolbar';

function Navigation() {
  return (
    <div className="tool-bar">
      <div className="tool-bar--left">
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
      <div className="tool-bar--right"></div>
    </div>
  );
}

export default Navigation;
