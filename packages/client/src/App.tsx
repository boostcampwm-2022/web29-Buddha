import { BrowserRouter } from 'react-router-dom';
import Router from '@/Router';
import Layout from '@/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
