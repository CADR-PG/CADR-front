import FileNavigationItem from './FileNavigationItem';
import LightNavigationItem from './LightNavigationItem';
import ObjectNavigationItem from './ObjectNavigationItem';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import StartStopBtnToolbar from './StartStopBtnToolbar';

function Navigation() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="tool-bar">
        <FileNavigationItem />
        <ObjectNavigationItem />
        <LightNavigationItem />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PlayButton />
        <PauseButton />
        <StartStopBtnToolbar />
      </div>
      <div></div>
    </div>
  );
}

export default Navigation;
