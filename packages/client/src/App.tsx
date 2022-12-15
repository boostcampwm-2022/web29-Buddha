import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from '@/Router';
import Layout from '@/Layout';
import Toast from '@/components/Toast';

import UserRoleProvider from './UserRoleProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <UserRoleProvider>
            <Layout>
              <BrowserRouter>
                <Router></Router>
                <Toast />
              </BrowserRouter>
            </Layout>
          </UserRoleProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
