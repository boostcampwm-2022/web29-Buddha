import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Router from '@/Router';
import Layout from '@/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Layout>
            <BrowserRouter>
              <Router></Router>
            </BrowserRouter>
          </Layout>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
