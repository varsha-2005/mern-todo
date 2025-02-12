import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Todo from './pages/Todo';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route index element={<Todo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
