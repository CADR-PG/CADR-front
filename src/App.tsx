import 'allotment/dist/style.css';
import './css/main.scss';
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
