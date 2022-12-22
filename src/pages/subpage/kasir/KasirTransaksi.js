import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const KasirUtama = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [dataKasir, setDataKasir] = useState([]);
    const [kode, setKode] = useState('');
    const [items, setItems] = useState([]);
    const [namaBarang, setNamaBarang] = useState('');
    const [hargaBarang, setHargaBarang] = useState();
    const [noBarang, setNoBarang] = useState();
    const [kuantitasBarang, setKuantitasBarang] = useState();
    const [subtotal, setSubtotal] = useState();
    const [idtransaksi, setIdTransaksi] = useState();
    const [total, setTotal] = useState(0);
    const [bayar, setBayar] = useState(0);
    const [kembalian, setKembalian] = useState(0);

    var dt = new Date();
    var toDate = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
    const idDate = dt.getMonth() + "" + dt.getDate() + "" + dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();


    const getDataKasir = async () => {
        const data = localStorage.getItem("datakasir");
        setDataKasir(JSON.parse(data));
    };

    useEffect(() => {
        getDataKasir();
        setIdTransaksi(idDate);
    }, []);


    const GetProdukKode = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/get-produk-kode', {
            kode: kode
        });
        setNoBarang(res.data.no_produk);
        setNamaBarang(res.data.nama_produk);
        setHargaBarang(res.data.harga);
    }

    const SaveItem = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/get-save-item', {
            id_transaksi: idtransaksi,
            id_produk: noBarang,
            kuantitas: kuantitasBarang,
            subTotal: subtotal
        });
        setItems(res.data.listItem);
        setTotal(total + subtotal);
        setKode('');
        setNamaBarang('');
        setHargaBarang('');
        setKuantitasBarang('');
        setSubtotal('');
    }

    const DeleteItem = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/get-delete-item', {
            id_transaksi: idtransaksi,
            no_detail: e.target.value
        });
        setItems(res.data.listItem);
        console.log(res.data.subtotalItem)
        setTotal(total - res.data.subtotalItem[0].subtotal)
        console.log(items);
    }

    const changeKuantitas = (e) => {
        setSubtotal(e.target.value * hargaBarang)
        setKuantitasBarang(e.target.value)
    };

    const changeBayar = (e) => {
        setKembalian(e.target.value - total)
        setBayar(e.target.value)
    };

    const SaveTransaksi = async (e) => {
        if (bayar < total) {
            alert("Uang Kurang")
        } else {
            const res = await axios.post('http://localhost:5000/save-transaksi', {
                id_transaksi: idtransaksi,
                id_karyawan: dataKasir.idkasir,
                tanggal_penjualan: toDate,
                total_transaksi: total,
                bayar: bayar
            });
        }
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-6 mt-5">
                    <form onSubmit={GetProdukKode}>
                        <div className="row">
                            <div className="col-10">
                                <label>Kode Produk</label>
                                <input type="text" className="form-control" value={kode} onChange={(e) => setKode(e.target.value)} />
                            </div>
                            <div className="col-2 mt-4 pt-2">
                                <button type="submit" className="btn btn-primary">Cari</button>
                            </div>
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <label for="nama-produk">Nama Produk</label>
                            <input type="text" className="form-control" id="nama-produk" value={namaBarang} disabled />
                        </div>
                        <div className="form-group">
                            <label for="harga-produk">Harga (Rp.)</label>
                            <input type="text" className="form-control" id="harga-produk" value={hargaBarang} disabled />
                        </div>
                        <div className="form-group">
                            <label for="kuantitas-produk">Kuantitas</label>
                            <input type="number" className="form-control" id="kuantitas-produk" value={kuantitasBarang} onChangeCapture={changeKuantitas} />
                        </div>
                        <div className="form-group">
                            <label for="subtotal">Subtotal (Rp.)</label>
                            <input className="form-control" value={subtotal} id="subtotal" disabled />
                        </div>
                    </form>
                </div>
                <div className="col-6 mt-5">
                    <div className="form-group">
                        <label for="total">Total (Rp.)</label>
                        <input type="text" className="form-control" id="total" value={total} disabled />
                    </div>
                    <div className="form-group">
                        <label for="bayar">Bayar</label>
                        <input type="text" className="form-control" id="bayar" value={bayar} onChange={changeBayar} required />
                    </div>
                    <div className="form-group">
                        <label for="kembalian">Kembalian (Rp.)</label>
                        <input type="text" className="form-control" id="kembalian" value={kembalian} disabled />
                    </div>
                    <div className="button-groups mt-5 text-center">
                        {/* <button type="button" className="btn btn-primary mr-3" id="cari-barang" data-toggle="modal" data-target="#cariModal">Cari Produk</button> */}
                        <button type="button" id="tambah-produk" className="btn btn-primary" onClick={SaveItem}>Tambah Produk</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col mt-5 mb-5">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nama Barang</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Kuantitas</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((Item, index) => {
                                return (
                                    <tr key={Item.no_detail}>
                                        <td>{index + 1}</td>
                                        <td>{Item.nama_produk}</td>
                                        <td>{Item.harga}</td>
                                        <td>{Item.kuantitas}</td>
                                        <td>{Item.subtotal}</td>
                                        <td><button type="button" class="btn btn-danger btn-delete" value={Item.no_detail} onClick={DeleteItem}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col mt-5">
                    <a href='/laporan-akhir' className="btn btn-primary float-start">Logout</a>
                    <button type="button" id="selesai-transaksi" className="btn btn-primary float-end" onClick={SaveTransaksi}>Selesai</button>
                </div>
            </div>
        </div>

    )
}
export default KasirUtama;