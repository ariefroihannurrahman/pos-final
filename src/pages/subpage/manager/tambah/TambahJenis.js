import axios from "axios";
import React, { useState } from 'react';
import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const EditJenis = () => {
    const serverHost = 'http://localhost:5000/';
    const [namaJenis, setNamaJenis] = useState();
    const navigate = useNavigate();

    const postData = (e) => {
        if((namaJenis !== undefined) && isNaN(namaJenis)){
            e.preventDefault();
            axios
                .post(serverHost + 'API/tambah/jenis', {
                    nama_jenis:namaJenis.charAt(0).toUpperCase() + namaJenis.slice(1)
                })
                .then(
                    response => {
                        navigate('/pos-final/mngr/jenis');
                    }
                )
                .catch(
                    error => {
                        console.log(error);
                    }
                )
        }
        // navigate('/pos-final/mngr/jenis');
    }

    const meta = {
        title: 'Edit Jenis | P.O.S',
        description: 'Halaman Manager | Tambah Jenis Produk',
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
                    <Title name={'Edit Jenis'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <form onSubmit={(e)=>{postData(e)}} className="needs-validation" noValidate>
                                <div className="row form-row mb-3">
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="nama_jenis">Nama Jenis</label>
                                        <input type="text" className="form-control" id="nama_jenis" onChange={(e)=>{setNamaJenis(e.target.value)}} placeholder="Jenis" required/>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Tambah</button>
                                <a href="/pos-final/mngr/jenis" className="btn btn-danger">Kembali</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default EditJenis;