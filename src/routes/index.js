import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Users,
  Queries,
  SubAdmin,
  AdminLogin,
  AddSubAdmin
} from "@pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/admin" element={<Users />} />
        <Route path="/admin/queries" element={<Queries />} />
        <Route path="/admin/sub-admin" element={<SubAdmin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/add-sub-admin" element={<AddSubAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
