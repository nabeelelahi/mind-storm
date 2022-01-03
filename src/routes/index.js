import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Dashboard,
  WorkSpaces,
  WorkSpacePage,
  CreateWorkSpace,
  JoinedWorkSpaces,
  Sessions,
  BrainWriting,
  StarBursting,
  Users,
  Queries,
  SubAdmin,
  AddSubAdmin,
} from "@pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work-spaces" element={<WorkSpaces />} />
        <Route path="/work-space/:id" element={<WorkSpacePage />} />
        <Route path="/joined-work-spaces" element={<JoinedWorkSpaces />} />
        <Route path="/create-work-space" element={<CreateWorkSpace />} />
        <Route path="/sessions/:workspaceId" element={<Sessions />} />
        <Route path="/session/brain-writing/:id" element={<BrainWriting />} />
        <Route path="/session/star-bursting/:id" element={<StarBursting />} />
        <Route path="/admin" element={<Users />} />
        <Route path="/admin/queries" element={<Queries />} />
        <Route path="/admin/sub-admin" element={<SubAdmin />} />
        <Route path="/admin/add-sub-admin" element={<AddSubAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
