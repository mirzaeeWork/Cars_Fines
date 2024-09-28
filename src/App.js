import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import NoPage from "./pages/NoPage";
import CarFines from './pages/CarFines/CarFines';
import Fines from './pages/Fines/Fines';
import Cars from './pages/Carss/Cars';
import CarDetails from './pages/Carss/CarDetails';
import Detailes from './pages/CarFines/Detailes';
import AddEditFines from './pages/Fines/AddEditFines';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CarFines />} />
            <Route path="/car-fines/:id" element={<Detailes />} />
            <Route path="fines" element={<Fines />} />
            <Route path="/fines/add" element={<AddEditFines />} />
            <Route path="/fines/:id" element={<AddEditFines />} />
            <Route path="cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            {/* <Route path="car-fines" element={<CarFines />} /> */}
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      

    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);