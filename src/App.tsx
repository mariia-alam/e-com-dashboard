import { Toaster } from 'react-hot-toast';
import { LangProvider } from './hooks/use-lang';
import router from './routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
    <LangProvider>
      <main className="flex h-screen">
        <RouterProvider router={router} />
      </main>
      </LangProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
