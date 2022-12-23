import axios from "axios";
import React, { useState, useEffect } from 'react';
import DocumentMeta from "react-document-meta";
import { useNavigate, useParams } from "react-router-dom";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const EditProduk = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataJenis, setDataJenis] = useState();
    const [dataKategori, setDataKategori] = useState();
    const [noProduk, setNoProduk] = useState();
    const [kodeProduk, setKodeProduk] = useState();
    const [namaProduk, setNamaProduk] = useState();
    const [noJenis, setNoJenis] = useState();
    const [noKategori, setNoKategori] = useState();
    const [harga, setHarga] = useState();
    const {no_produk} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(serverHost + 'API/produk')
            .then(
                response => {
                    // console.log(response.data);
                    // console.log(no_produk);
                    response.data.map((produk)=>{
                        // console.log(produk.no_jenis);
                        if(produk.no_produk === parseInt(no_produk)){
                            setNoProduk(produk.no_produk);
                            setKodeProduk(produk.kd_produk);
                            setNamaProduk(produk.nama_produk);
                            setNoJenis(produk.no_jenis);
                            setNoKategori(produk.no_kategori);
                            setHarga(produk.harga);
                        }
                        return('') ;
                    })
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
                    // console.log(response.data);
                    setDataKategori(response.data);
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
                    setDataJenis(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
        }, [serverHost]);

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
    const handleChangeHargaProduk = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if (event.target.value >= 0){
            setHarga(event.target.value);
        } 
    }

    const postData = (event) => {
        if(isNaN(namaProduk)){
            event.preventDefault();
            axios
                .post(
                    serverHost + "API/post/produk",
                    {
                        no_produk:noProduk,
                        kd_produk:kodeProduk,
                        nama_produk:namaProduk.charAt(0).toUpperCase() + namaProduk.slice(1),
                        no_jenis:noJenis,
                        no_kategori:noKategori,
                        harga:harga,
                    }
                )
                .then(
                    response => {
                        // console.log(response.data);
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

    const meta = {
        title: 'Manager | P.O.S',
        description: 'Halaman Manager | Edit Produk Produk',
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
                    <Title name={'Edit Produk'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <form onSubmit={(e)=>{postData(e)}} className="needs-validation" noValidate>
                                <div className="row form-row mb-3">
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="kode_produk">Kode Produk</label>
                                        <input name="kd_produk" type="number" className="form-control" id="kode_produk" value={kodeProduk} readOnly placeholder="Kode Produk" disabled/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="nama_produk">Nama Produk</label>
                                        <input name="nama_produk" type="text" className="form-control" id="nama_produk" placeholder="Produk" value={namaProduk} onChange={handleChangeNamaProduk} required/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <select name="no_jenis" value={noJenis} onChange={handleChangeNoJenisProduk} className="form-select" aria-label="select jenis">
                                            {dataJenis && dataJenis.map((jenis, i)=>{
                                                return(
                                                    <option key={i} value={jenis.no_jenis}>{jenis.nama_jenis}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <select name="no_kategori" value={noKategori} onChange={handleChangeNoKategoriProduk} className="form-select" aria-label="select kategori">
                                            {dataKategori && dataKategori.map((kategori, i)=>{
                                                return(
                                                    <option key={i} value={kategori.no_kategori}>{kategori.nama_kategori}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="harga_produk">Harga Produk</label>
                                        <input 
                                            name="harga" 
                                            type="number" 
                                            value={harga} 
                                            className="form-control" 
                                            id="harga_produk" 
                                            placeholder="Harga Produk" 
                                            onChange={handleChangeHargaProduk} 
                                            required/>
                                    </div>
                                </div>
                                <input name="no_produk" value={no_produk} readOnly type='number' hidden/>
                                <button className="btn btn-primary" type="submit">Edit</button>
                                <a href="/pos-final/mngr/produk" className="btn btn-danger">Kembali</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default EditProduk;