import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AdminLayout from './AdminLayout';
import Layout from './Layout';


const root = ReactDOM.createRoot(document.getElementById('root'));

const auth2 = localStorage.getItem('admin');

root.render(
  <React.StrictMode>
     {auth2 ? 
        <AdminLayout /> :
         <Layout />}
  </React.StrictMode>
);
