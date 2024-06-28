import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import { useState } from 'react';
import MindMap from './components/MindMap/mindMap';
import fakeData from './treeData.json'

function App() {

  const [searchValue, setSearchValue] = useState(null)
  const [treeData, setTreeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  return (
    <BrowserRouter>
      <Layout
        setSearchValue={setSearchValue}
        setTreeData={setTreeData}
        setLoading={setLoading}
        searchValue={searchValue}
        setError={setError}
      >
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='dashboard' element={<Home
              treeData={treeData}
              loading={loading}
              searchValue={searchValue}
              error={error}
            />} />
            <Route path=':word' element={<Home
              treeData={treeData}
              loading={loading}
              searchValue={searchValue}
            />} />
            <Route path='mindmap' element={<MindMap data={fakeData} />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
