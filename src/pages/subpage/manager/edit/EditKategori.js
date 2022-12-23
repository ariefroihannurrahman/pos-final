import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import axios from "axios";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const EditKategori = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataKategori, setDataKategori] = useState();
    const [namaKategori, setNamaKategori] = useState();
    const {no_kategori} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(serverHost + 'API/kategori')
            .then(
                response => {
                    // console.log(response.data);
                    setDataKategori(response.data);
                    response.data.map((kategori, index)=>{
                        if (kategori.no_kategori === parseInt(no_kategori)) {
                            setNamaKategori(kategori.nama_kategori);
                        }

                        return('');
                    })
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }, []);
    
    const postData = (e) => {
        // console.log(namaKategori.charAt(0).toUpperCase() + namaKategori.slice(1))
        if ((namaKategori !== undefined) && isNaN(namaKategori)) {
            e.preventDefault();
            axios
                .post(serverHost + 'API/post/kategori', {
                    nama_kategori:namaKategori.charAt(0).toUpperCase() + namaKategori.slice(1), 
                    no_kategori:no_kategori
                })
                .then(
                    response => {
                        // console.log(response);
                        navigate('/pos-final/mngr/kategori');
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                    }
                )
        }
        
        // navigate('/pos-final/mngr/kategori');
    }
    
    const meta = {
        title: 'Manager | P.O.S',
        description: 'Halaman Manager | Edit Kategori Produk',
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
                    <Title name={'Edit Kategori'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                        <form className="needs-validation" noValidate>
                            {dataKategori && dataKategori.map((kategori, index)=>{
                                if (kategori.no_kategori === parseInt(no_kategori)) {
                                    return(
                                        <div key={index} className="row form-row mb-3">
                                            <div className="col-6 mb-3">
                                                <label className="mb-2" htmlFor="kode_kategori">Kode Kategori</label>
                                                <input type="text" className="form-control" id="kode_kategori" placeholder="Kode Kategori" readOnly value={kategori.no_kategori} disabled/>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label className="mb-2" htmlFor="nama_kategori">Kategori</label>
                                                <input type="text" className="form-control" id="nama_kategori" placeholder="Kategori" onChange={(e)=>{setNamaKategori(e.target.value)}} value={namaKategori} required/>
                                            </div>
                                        </div>
                                    );
                                }
                                return("");
                            })}
                            <button onClick={(e)=>{postData(e)}} className="btn btn-primary">Edit</button>
                            <a href="/pos-final/mngr/kategori" className="btn btn-danger">Kembali</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default EditKategori;