import DocumentMeta from "react-document-meta";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Karyawan = () => {
    const serverHost = 'http://localhost:5000/'
    const [dataKaryawan, setDataKaryawan] = useState();

    useEffect(() => {
      axios
        .get(serverHost + 'API/karyawan')
        .then(
            response => {
                // console.log(response.data);
                setDataKaryawan(response.data);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    }, [])
    
    // const deleteKaryawan = (no_karyawan) =>{
    //     console.log(no_karyawan);
    //     axios
    //         .delete(serverHost + `API/delete/karyawan/${no_karyawan}`)
    //         .then(
    //             res => {
    //                 console.log(res);
    //                 window.location.reload();
    //             }
    //         )
    //         .catch(
    //             error => {
    //                 console.log(error);
    //             }
    //         )
    // }

    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager | Karyawan Produk',
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
                    <Title name={'Karyawan'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="row text-content">
                                <div className="col-6">
                                    <h3>Detail Karyawan</h3>
                                </div>
                                <div className="col-6 text-end">
                                    <a className="btn btn-info cl-white mb-3" href="karyawan/t">Tambah Karyawan</a>
                                </div>
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
                                        <th scope="col">Token</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Alamat</th>
                                        <th scope="col">Aksi</th>
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
                                                <td>{karyawan.status}</td>
                                                <td>{karyawan.alamat}</td>
                                                <td>
                                                    <a className="btn btn-primary" href={`karyawan/e/${karyawan.no_karyawan}`}>Edit</a>
                                                    {/* <button onClick={()=>{deleteKaryawan(karyawan.no_karyawan)}} className="btn btn-danger">Delete</button> */}
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

export default Karyawan;