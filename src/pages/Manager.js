import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import NavigationBar from "../components/NavigationBar";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Manager = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataKaryawan, setDataKaryawan] = useState();
    const [dataProduk, setDataProduk] = useState();
    const [dataPenjualan, setDataPenjualan] = useState();
    const [dataKategori, setDataKategori] = useState();
    const [dataJenis, setDataJenis] = useState();
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.clear();
        navigate("/")
    }

    const checkUserToken = () => {
        if (!localStorage.getItem("datakasir")) {
            navigate("/");
        }
    }

    useEffect(() => {
        checkUserToken();
        axios
            .get(serverHost + 'API/karyawan')
            .then(
                response => {
                    console.log(response.data);
                    setDataKaryawan(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
        axios
            .get(serverHost + 'API/jenis')
            .then(
                response => {
                    console.log(response.data);
                    setDataJenis(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
        axios
            .get(serverHost + 'API/kategori')
            .then(
                response => {
                    console.log(response.data);
                    setDataKategori(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
        axios
            .get(serverHost + 'API/produk')
            .then(
                response => {
                    console.log(response.data);
                    setDataProduk(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
        axios
            .get(serverHost + 'API/transaksi')
            .then(
                response => {
                    console.log(response.data);
                    setDataPenjualan(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }, [])
    
    const cekKaryawan = (params) => {
        for (let i = 0; i < dataKaryawan.length; i++) {
            if(dataKaryawan[i].no_karyawan === params) return dataKaryawan[i].nama_karyawan
        }
    }

    const cekJenis = (params) => {
        for (let i = 0; i < dataJenis.length; i++) {
            console.log(dataJenis[i].no_jenis);
            if(dataJenis[i].no_jenis === params) return dataJenis[i].nama_jenis;
        }
    }

    const cekKategori = (params) => {
        for (let i = 0; i < dataKategori.length; i++) {
            console.log(dataJenis[i].no_kategori);
            if(dataKategori[i].no_kategori === params) return dataKategori[i].nama_kategori;
        }
    }
    
    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'pos, react, meta, document, html, tags, manager',
            author: 'Arief Roihan Nur Rahman, Adi Pratama Putra, Ayuni Tia Sari',
            viewport: 'width=device-width, initial-scale=1.0',
          }
        }
    };

    return(
        <DocumentMeta {...meta}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Manager | P.O.S</title>
            </Helmet>

            <div className="d-flex flex-row">
                <NavigationBar />
                <div className="container m-3">
                    <Title name={'Dasboard'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="title-content mb-4">
                                <h2>Laporan Penjualan</h2>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kode Penjualan</th>
                                        <th scope="col">Nama Karyawan</th>
                                        <th scope="col">Tanggal Penjualan</th>
                                        <th scope="col">Total Penjualan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPenjualan && dataPenjualan.map((penjualan, index)=>{
                                        const date = new Date(penjualan.tanggal_penjualan);
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{penjualan.no_transaksi}</td>
                                                <td>{dataKaryawan && cekKaryawan(penjualan.no_karyawan)}</td>
                                                <td>{date.toLocaleDateString("id-ID").split("T")[0]}</td>
                                                <td>{penjualan.total_transaksi}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="title-content mb-4">
                                <h2>Detail Karyawan</h2>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">ID Karyawan</th>
                                        <th scope="col">Nama Karyawan</th>
                                        <th scope="col">Nomor Handphone</th>
                                        <th scope="col">Jenis Kelamin</th>
                                        <th scope="col">Tanggal Rekrut</th>
                                        <th scope="col">Jabatan</th>
                                        <th scope="col">Kode</th>
                                        <th scope="col">Alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataKaryawan && dataKaryawan.map((karyawan, index)=>{
                                        const date = new Date(karyawan.tanggal_rekrut);
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{karyawan.id_karyawan}</td>
                                                <td>{karyawan.nama_karyawan}</td>
                                                <td>{karyawan.nomor_handphone}</td>
                                                <td>{karyawan.jenis_kelamin}</td>
                                                <td>{date.toLocaleDateString('id-ID')}</td>
                                                <td>{karyawan.jabatan}</td>
                                                <td>{karyawan.kode}</td>
                                                <td>{karyawan.alamat}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="title-content mb-4">
                                <h2>Detail Produk</h2>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kode Produk</th>
                                        <th scope="col">Nama Produk</th>
                                        <th scope="col">Jenis Produk</th>
                                        <th scope="col">Kategori Produk</th>
                                        <th scope="col">Harga Produk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataProduk && dataProduk.map((produk, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{produk.kd_produk}</td>
                                                <td>{produk.nama_produk}</td>
                                                <td>{dataJenis && cekJenis(produk.no_jenis)}</td>
                                                <td>{dataKategori && cekKategori(produk.no_kategori)}</td>
                                                <td>{produk.harga}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="title-content mb-4">
                                <h2>Detail Kategori</h2>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kategori</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataKategori && dataKategori.map((kategori, index)=>{
                                      return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{kategori.nama_kategori}</td>
                                        </tr>
                                      );  
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="title-content mb-4">
                                <h2>Detail Jenis</h2>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Nama Jenis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataJenis && dataJenis.map((jenis, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>
                                                    {index+1}
                                                </td>

                                                <td>{jenis.nama_jenis}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default Manager;