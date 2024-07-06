import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import { useState } from 'react';
import MindMap from './components/MindMap/MindMap';
import fakeData from './treeData.json'
import TreeComponent from './components/Tree/TreeComponent';
import ReactflowMindMap from './components/MindMap/ReactFlow/ReactflowMindmap';

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
        loading={loading}
        treeData={treeData}
        error={error}
      >
        <Routes>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<TreeComponent data={treeData} />} />
          <Route path='/mindmap' element={<MindMap data={fakeData} />} />
        </Routes>
      </Layout>
      <Routes>
        <Route path='/reactflow' element={<ReactflowMindMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
