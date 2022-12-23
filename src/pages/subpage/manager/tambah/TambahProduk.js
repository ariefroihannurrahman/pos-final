import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const TambahProduk = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataJenis, setDataJenis] = useState();
    const [dataKategori, setDataKategori] = useState();
    const [kodeProduk, setKodeProduk] = useState();
    const [namaProduk, setNamaProduk] = useState();
    const [noJenis, setNoJenis] = useState();
    const [noKategori, setNoKategori] = useState();
    const [harga, setHarga] = useState();
    const navigate = useNavigate();

    useEffect(() => {
    axios
        .get(serverHost + 'API/jenis')
        .then(
            response => {
                console.log(response.data);
                setDataJenis(response.data)
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
                setDataKategori(response.data)
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    }, [serverHost])
    

    const postData = (e) => {
        console.log(kodeProduk)
        if(isNaN(namaProduk)){
            e.preventDefault();
            axios
                .post(serverHost + 'API/tambah/produk', {
                    kd_produk:kodeProduk,
                    nama_produk:namaProduk.charAt(0).toUpperCase() + namaProduk.slice(1),
                    no_jenis:noJenis,
                    no_kategori:noKategori,
                    harga:harga,
                })
                .then(
                    response => {
                        console.log(response.data);
                        navigate('/pos-final/mngr/produk');
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                    }
                )
        }
    }

    const handleChangeNamaProduk = (event) => {
        if ((event.target.value !== undefined)){
            setNamaProduk(event.target.value);
        }
    }
    const handleChangeNoJenisProduk = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if (event.target.value >= 0){
            setNoJenis(event.target.value);
        }
    }
    const handleChangeNoKategoriProduk = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if (event.target.value >= 0){
            setNoKategori(event.target.value);
        }
    }
    const handleChangeKodeProduk = (event) => {
        if (event.target.value >= 0){
            setKodeProduk(event.target.value);
        } else {
            window.location.reload();
        }
    }
    const handleChangeHargaProduk = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if (event.target.value >= 0){
            setHarga(event.target.value);
        } 
    }

    const meta = {
        title: 'Manager | P.O.S',
        description: 'Halaman Manager | Tambah Produk',
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
                    <Title name={'Tambah Produk'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                        <form onSubmit={(e)=>{postData(e)}} className="needs-validation" noValidate>
                            <div className="row form-row mb-3">
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="kode_produk">Kode Produk</label>
                                    <input type="number" onChange={handleChangeKodeProduk} className="form-control" id="kode_produk" placeholder="Kode Produk" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="nama_produk">Nama Produk</label>
                                    <input type="text" onChange={handleChangeNamaProduk} className="form-control" id="nama_produk" placeholder="Produk" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <select  onChange={handleChangeNoJenisProduk} className="form-select" aria-label="select jenis">
                                        <option value={-1} >Pilih</option>
                                        {dataJenis && dataJenis.map((jenis, index)=>{
                                            return(
                                                <option key={index} value={jenis.no_jenis}>{jenis.nama_jenis}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col-6 mb-3">
                                    <select onChange={handleChangeNoKategoriProduk} className="form-select" aria-label="select jenis">
                                        <option value={-1}>Pilih</option>
                                        {dataKategori && dataKategori.map((kategori, index)=>{
                                            return(
                                                <option key={index} value={kategori.no_kategori}>{kategori.nama_kategori}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="harga_produk">Harga Produk</label>
                                    <input type="number" name="harga"  className="form-control" id="harga_produk" placeholder="Harga Produk" onChange={handleChangeHargaProduk} required/>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Tambah</button>
                            <a href="/pos-final/mngr/produk" className="btn btn-danger">Kembali</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default TambahProduk;