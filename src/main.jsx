import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Route/Route';
import AuthProvider from './Provider/AuthProvider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div className="max-w-[1920px] mx-auto">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
