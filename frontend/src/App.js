import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import { useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

function App() {

  const [searchValue, setSearchValue] = useState(null)
  const [treeData, setTreeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

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
        setNodes={setNodes}
        setEdges={setEdges}
      >
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='dashboard' element={
              <Home
                treeData={treeData}
                loading={loading}
                searchValue={searchValue}
                setNodes={setNodes}
                setEdges={setEdges}
                edges={edges}
                nodes={nodes}
              />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
