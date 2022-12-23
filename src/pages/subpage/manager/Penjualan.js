import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Penjualan = () => {
    const serverHost = "http://localhost:5000/";
    const [dataPenjualan, setDataPenjualan] = useState();
    const [dataKaryawan, setDataKaryawan] = useState();

    const cekKaryawan = (params) => {
        for (let i = 0; i < dataKaryawan.length; i++) {
            if(dataKaryawan[i].no_karyawan === params) return dataKaryawan[i].nama_karyawan
        }
    }

    useEffect(() => {
        axios
            .get(serverHost + 'API/penjualan')
            .then(
                response => {
                    // console.log(response.data);
                    setDataPenjualan(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
            axios
                .get(serverHost + 'API/karyawan')
                .then(
                    res => {
                        console.log(res.data);
                        setDataKaryawan(res.data);
                    }
                )
                .catch(
                    err => {
                        console.log(err);
                    }
                )
    }, [])
    

    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager | Penjualan Produk',
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
                    <Title name={'Detail Penjualan'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kode Penjualan</th>
                                        <th scope="col">Nama Karyawan</th>
                                        <th scope="col">Tanggal Penjualan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPenjualan && dataPenjualan.map((penjualan, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{penjualan.kd_penjualan}</td>
                                                <td>{dataKaryawan && cekKaryawan(penjualan.no_karyawan)}</td>
                                                <td>{penjualan.tanggal_penjualan}</td>
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

export default Penjualan;