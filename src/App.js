import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import Manager from "./pages/Manager";
import Home from "./pages/Home";
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const App = () => {
  const meta = {
    title: 'P.O.S',
    description: 'Halaman Utama P.O.S',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'pos,react,meta,document,html,tags',
        author: 'Arief Roihan Nur Rahman, Adi Pratama Putra, Ayuni Tia Sari',
        viewport: 'width=device-width, initial-scale=1.0',
      }
    }
  };

  return (
    // Document Meta untuk mengubah tag meta pada html
    <DocumentMeta {...meta}>
      {/* Tempat menyimpan route */}
      <BrowserRouter>
        <Routes>
          {/* Route ke home untuk awalan */}
          <Route path="/" element={<Home />} />

          {/* Route ke repository */}
          <Route path="/pos-final/">

            {/* Route ke home sesuai repository*/}
            <Route index element={<Home />} />
            
            {/* Route ke halaman manager sesuai repository */}
            <Route path="mngr" element={<Manager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DocumentMeta>
  );
}

export default App;
