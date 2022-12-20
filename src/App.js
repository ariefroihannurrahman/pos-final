import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import Manager from "./pages/Manager";
import Home from "./pages/Home";
import Penjualan from "./pages/subpage/manager/Penjualan";
import Produk from "./pages/subpage/manager/Produk";
import EditProduk from "./pages/subpage/manager/edit/EditProduk";
import Kategori from "./pages/subpage/manager/Kategori";
import EditKategori from "./pages/subpage/manager/edit/EditKategori";
import Jenis from "./pages/subpage/manager/Jenis";
import EditJenis from "./pages/subpage/manager/edit/EditJenis";
import Karyawan from "./pages/subpage/manager/Karyawan";
import EditKaryawan from "./pages/subpage/manager/edit/EditKaryawan";
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
            <Route path="mngr/" element={<Manager />} />
            <Route path="mngr/dashboard" element={<Manager />} />
            <Route path="mngr/penjualan" element={<Penjualan />} />
            
            {/* Route ke halaman kategori */}
            <Route path="mngr/produk">
              <Route index element={<Produk />} />
              <Route path="e" element={<EditProduk />} />
            </Route>

            {/* Route ke halaman kategori */}
            <Route path="mngr/kategori">
              <Route index element={<Kategori />} />
              <Route path="e" element={<EditKategori />} />
            </Route>
            
            {/* Route ke halaman jenis */}
            <Route path="mngr/jenis/">
              <Route index element={<Jenis />}/>
              <Route path="e" element={<EditJenis />} />
            </Route>
            
            <Route path="mngr/karyawan" element={<Karyawan />} />
            
            <Route path="mngr/karyawan/">
              <Route index element={<Karyawan />}/>
              <Route path="e" element={<EditKaryawan />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </DocumentMeta>
  );
}

export default App;
