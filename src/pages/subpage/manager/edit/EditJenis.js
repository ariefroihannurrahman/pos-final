import axios from "axios";
import React, { useState, useEffect } from 'react';
import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const EditJenis = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataJenis, setDataJenis] = useState();
    const [namaJenis, setNamaJenis] = useState();
    const {no_jenis} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get(serverHost + 'API/jenis')
        .then(
            response => {
                // console.log(response.data);
                setDataJenis(response.data);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    }, []);
    

    const postData = (e) => {
        if ((namaJenis !== undefined) && isNaN(namaJenis)) {
            e.preventDefault();
            axios
                .post(serverHost + 'API/post/jenis', {
                    nama_jenis:namaJenis.charAt(0).toUpperCase() + namaJenis.slice(1), 
                    no_jenis:no_jenis
                })
                .then(
                    response => {
                        // console.log(response);
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
        description: 'Halaman Manager | Edit Jenis Produk',
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
                            <form className="needs-validation" noValidate>
                                {dataJenis && dataJenis.map((jenis, index)=>{
                                    if (jenis.no_jenis === parseInt(no_jenis)) {
                                        return(
                                            <div key={index} className="row form-row mb-3">
                                                <div className="col-6 mb-3">
                                                    <label className="mb-2" htmlFor="kode_jenis">Kode Jenis</label>
                                                    <input type="text" className="form-control" id="kode_jenis" placeholder="Kode Jenis" value={jenis.no_jenis} disabled/>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label className="mb-2" htmlFor="nama_jenis">Nama Jenis</label>
                                                    <input type="text" className="form-control" id="nama_jenis" onChange={(e)=>{setNamaJenis(e.target.value)}} placeholder="Jenis" defaultValue={jenis.nama_jenis} required/>
                                                </div>
                                            </div> 
                                        );
                                    }
                                    return("");
                                })}
                                <button onClick={(e) => postData(e)} className="btn btn-primary">Edit</button>
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