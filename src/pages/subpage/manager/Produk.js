import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Produk = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataProduk, setDataProduk] = useState();
    const [dataJenis, setDataJenis] = useState();
    const [dataKategori, setDataKategori] = useState();
    
    useEffect(() => {
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
            )
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
            )
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
            )
    }, []);

    const cekJenis = (params) => {
        for (let i = 0; i < dataJenis.length; i++) {
            console.log(dataJenis[i].no_jenis);
            if(dataJenis[i].no_jenis === parseInt(params)) return dataJenis[i].nama_jenis;
        }
    }

    const cekKategori = (params) => {
        for (let i = 0; i < dataKategori.length; i++) {
            console.log(dataJenis[i].no_kategori);
            if(dataKategori[i].no_kategori === parseInt(params)) return dataKategori[i].nama_kategori;
        }
    }

    const deleteProduk = (no_produk) =>{
        console.log(no_produk);
        axios
            .delete(serverHost + `API/delete/produk/${no_produk}`)
            .then(
                res => {
                    console.log(res);
                    window.location.reload();
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }

    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager | Produk Produk',
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
                    <Title name={'Produk'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="row text-content">
                                <div className="col-6">
                                    <h3>Detail Produk</h3>
                                </div>
                                <div className="col-6 text-end">
                                    <a className="btn btn-info cl-white mb-3" href="produk/t">Tambah Produk</a>
                                </div>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kode Produk</th>
                                        <th scope="col">Nama Produk</th>
                                        <th scope="col">Jenis</th>
                                        <th scope="col">Kategori</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Aksi</th>
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
                                                <td>
                                                    <a className="btn btn-primary" href={`produk/e/${produk.no_produk}`}>Edit</a>
                                                    <button onClick={()=>{deleteProduk(produk.no_produk)}} className="btn btn-danger">Delete</button>
                                                </td>
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

export default Produk;