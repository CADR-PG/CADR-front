import './css/main.scss';
import 'allotment/dist/style.css';
import Editor from './pages/Editor';
import useAuth from './hooks/useAuth';

function App() {
  useAuth();

  return (
    <>
      <Editor />
    </>
  );
}

export default App;
