import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import Manager from "./pages/Manager";
import Home from "./pages/Home";
import Penjualan from "./pages/subpage/manager/Penjualan";
import Produk from "./pages/subpage/manager/Produk";
import EditProduk from "./pages/subpage/manager/edit/EditProduk";
import TambahProduk from "./pages/subpage/manager/tambah/TambahProduk";
import Kategori from "./pages/subpage/manager/Kategori";
import EditKategori from "./pages/subpage/manager/edit/EditKategori";
import TambahKategori from "./pages/subpage/manager/tambah/TambahKategori";
import Jenis from "./pages/subpage/manager/Jenis";
import EditJenis from "./pages/subpage/manager/edit/EditJenis";
import TambahJenis from "./pages/subpage/manager/tambah/TambahJenis";
import Karyawan from "./pages/subpage/manager/Karyawan";
import EditKaryawan from "./pages/subpage/manager/edit/EditKaryawan";
import TambahKaryawan from "./pages/subpage/manager/tambah/TambahKaryawan";
import LaporanAwal from "./pages/subpage/kasir/LaporanAwal";
import LaporanAkhir from "./pages/subpage/kasir/LaporanAkhir";
import KasirTransaksi from "./pages/subpage/kasir/KasirTransaksi";
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate } from "react-router-dom";

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

          {/* Route Kasir */}
          <Route path='/laporan-awal' element={<LaporanAwal/>}/>
          <Route path='/kasir-transaksi' element={<KasirTransaksi/>}/>
          <Route path='/laporan-akhir' element={<LaporanAkhir/>}/>
          

          {/* Route ke repository */}
          <Route path="/pos-final/">

            {/* Route ke home sesuai repository*/}
            <Route index element={<Home />} />
            
            {/* Route ke halaman manager sesuai repository */}
            <Route path="mngr/" element={<Manager />} />

            {/* Route ke halaman dashboard */}
            <Route path="mngr/dashboard" element={<Manager />} />

            {/* Route ke halaman penjualan */}
            <Route path="mngr/penjualan" element={<Penjualan />} />
            
            {/* Route ke halaman produk */}
            <Route path="mngr/produk">
              <Route index element={<Produk />} />
              <Route path="e" element={<EditProduk />} />
              <Route path="t" element={<TambahProduk />} />
            </Route>

            {/* Route ke halaman kategori */}
            <Route path="mngr/kategori">
              <Route index element={<Kategori />} />
              <Route path="e" element={<EditKategori />} />
              <Route path="t" element={<TambahKategori />} />
            </Route>
            
            {/* Route ke halaman jenis */}
            <Route path="mngr/jenis/">
              <Route index element={<Jenis />}/>
              <Route path="e" element={<EditJenis />} />
              <Route path="t" element={<TambahJenis />} />
            </Route>
          
            {/* Route ke halaman karyawan */}
            <Route path="mngr/karyawan/">
              <Route index element={<Karyawan />}/>
              <Route path="e" element={<EditKaryawan />} />
              <Route path="t" element={<TambahKaryawan />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </DocumentMeta>
  );
}

export default App;
