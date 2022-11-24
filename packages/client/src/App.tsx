import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Router from '@/Router';
import Layout from '@/Layout';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Layout>
          <BrowserRouter>
            <Router></Router>
          </BrowserRouter>
        </Layout>
      </RecoilRoot>
    </div>
  );
}

export default App;
