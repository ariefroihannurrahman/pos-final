import React, {useEffect, useState} from "react";
import DocumentMeta from "react-document-meta";
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Jenis = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataJenis, setDataJenis] = useState();
    
    useEffect(() => {
        axios.get(serverHost + 'API/jenis')
        .then(
            res => {
                console.log(res.data);
                setDataJenis(res.data);
            })
        .catch(
            error => {
                console.log(error);
            }
        )
    }, []);
    
    const deleteJenis = (no_jenis) =>{
        console.log(no_jenis);
        axios
            .delete(serverHost + `API/delete/jenis/${no_jenis}`)
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
        description: 'Halaman Manager | Jenis Produk',
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
                    <Title name={'Jenis'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="row text-content">
                                <div className="col-6">
                                    <h3>Detail Jenis</h3>
                                </div>
                                <div className="col-6 text-end">
                                    <a className="btn btn-info cl-white mb-3" href="jenis/t">Tambah Jenis</a>
                                </div>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Nama Jenis</th>
                                        <th scope="col">Aksi</th>
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
                                                <td>
                                                    <a className="btn btn-primary" href={`jenis/e/${jenis.no_jenis}`}>Edit</a>
                                                    <button onClick={()=>{deleteJenis(jenis.no_jenis)}} className="btn btn-danger">Delete</button>
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

export default Jenis;