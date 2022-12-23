import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Kategori = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataKategori, setDataKategori] = useState();
    
    useEffect(() => {
        axios.get(serverHost + 'API/kategori')
        .then(
            res => {
                console.log(res.data);
                setDataKategori(res.data);
            })
        .catch(
            error => {
                console.log(error);
            }
        )
    }, []);

    const deleteKategori = (no_kategori) =>{
        console.log(no_kategori);
        axios
            .delete(serverHost + `API/delete/kategori/${no_kategori}`)
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
        description: 'Halaman Manager | Kategori Produk',
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
                    <Title name={'Kategori'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="row text-content">
                                <div className="col-6">
                                    <h3>Detail Kategori</h3>
                                </div>
                                <div className="col-6 text-end">
                                    <a className="btn btn-info cl-white mb-3" href="kategori/t">Tambah Kategori</a>
                                </div>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kategori</th>
                                        <th scope="col">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataKategori && dataKategori.map((kategori, index)=>{
                                      return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{kategori.nama_kategori}</td>
                                            <td>
                                                <a className="btn btn-primary" href={`kategori/e/${kategori.no_kategori}`}>Edit</a>
                                                <button onClick={()=>{deleteKategori(kategori.no_kategori)}} className="btn btn-danger">Delete</button>
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

export default Kategori;