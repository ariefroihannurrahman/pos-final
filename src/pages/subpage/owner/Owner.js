import React, { useState, useEffect } from 'react';
import axios from "axios";
import Title from "../../../components/Title";
import { useNavigate } from "react-router-dom";

const Owner = () => {
    const serverHost = "http://localhost:5000/";
    const [dataPenjualan, setDataPenjualan] = useState();
    const [dataKaryawan, setDataKaryawan] = useState();
    const navigate = useNavigate();

    const cekKaryawan = (params) => {
        for (let i = 0; i < dataKaryawan.length; i++) {
            if(dataKaryawan[i].no_karyawan === params) return dataKaryawan[i].nama_karyawan;
        }
    }

    const checkUserToken = () => {
        if (!localStorage.getItem("datakasir")) {
            navigate("/");
        }
    }

    useEffect(() => {
        checkUserToken();
        axios
            .get(serverHost + 'API/transaksi')
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

    return(
            <div className="d-flex flex-row">
                <div className="container navigation-bar m-0 p-3 mt-3 shadow">
                    <h1 className="text-center mb-4" >P.O.S</h1>
                    <div className="list-group mb-3">
                        <a href="/pos-final/" className="list-group-item text-center list-group-item-action mt-2 karyawan">Logout</a>
                    </div>
                </div>
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
                                        <th scope="col">Total Penjualan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPenjualan && dataPenjualan.map((penjualan, index)=>{
                                        const date = new Date(penjualan.tanggal_penjualan)
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{penjualan.no_transaksi}</td>
                                                <td>{cekKaryawan(penjualan.no_karyawan)}</td>
                                                <td>{date.toLocaleDateString('id-ID')}</td>
                                                <td>{penjualan.total_transaksi}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Owner;