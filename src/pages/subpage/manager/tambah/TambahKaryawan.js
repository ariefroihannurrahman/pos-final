import DocumentMeta from "react-document-meta";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const TambahKaryawan = () => {
    const serverHost = 'http://localhost:5000/';
    const [IDKaryawan, setIDKaryawan] = useState();
    const [namaKaryawan, setNamaKaryawan] = useState();
    const [nomorHandphone, setNomorHandphone] = useState();
    const [jenisKelamin, setJenisKelamin] = useState();
    const [tanggalRekrut, setTanggalRekrut] = useState();
    const [jabatan, setJabatan] = useState();
    const [kode, setKode] = useState();
    const [status, setStatus] = useState();
    const [alamat, setAlamat] = useState();
    const navigate = useNavigate();
    
    const postData = (e) => {
        e.preventDefault();
        const date = new Date(tanggalRekrut);
        if((isNaN(namaKaryawan && jenisKelamin && status && tanggalRekrut && alamat && jabatan)) && (nomorHandphone && kode && IDKaryawan !== undefined) && (status && jabatan && tanggalRekrut && alamat !== undefined))
        {
            axios
            .post(serverHost + 'API/tambah/karyawan', {
                id_karyawan:IDKaryawan,
                nama_karyawan:namaKaryawan,
                nomor_handphone:nomorHandphone,
                jenis_kelamin:jenisKelamin,
                tanggal_rekrut:date,
                jabatan:jabatan,
                kode:kode,
                status:status,
                alamat:alamat,
            })
            .then(
                response => {
                    // console.log(response.data);
                    navigate('/pos-final/mngr/karyawan');
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )} else {
                // navigate('/pos-final/mngr/karyawan');
            }
    }

    const handleChangeIDKaryawan = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if ((event.target.value > 0)){
            setIDKaryawan(event.target.value);
        }
    }
    const handleChangeNamaKaryawan = (event) => {
        if ((event.target.value !== undefined)){
            setNamaKaryawan(event.target.value);
        }
    }
    const handleChangeNomorHandphone = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if ((event.target.value > 0)){
            setNomorHandphone(event.target.value);
        }
    }
    const handleChangeJenisKelamin = (event) => {
        if ((event.target.value !== undefined)){
            setJenisKelamin(event.target.value);
        }
    }
    const handleChangeStatus = (event) => {
        if ((event.target.value !== undefined)){
            setStatus(event.target.value);
        }
    }
    const handleChangeTanggalRekrut = (event) => {
        if ((event.target.value !== undefined)){
            setTanggalRekrut(event.target.value);
        }
    }
    const handleChangeJabatan = (event) => {
        if ((event.target.value !== undefined)){
            setJabatan(event.target.value);
        }
    }
    const handleChangeKode = (event) => {
        if(isNaN(event.target.value)){
            window.location.reload();
        } else if (event.target.value > 0){
            setKode(event.target.value);
        }
    }
    const handleChangeAlamat = (event) => {
        if ((event.target.value !== undefined)){
            setAlamat(event.target.value);
        }
    }

    const meta = {
        title: 'Manager | P.O.S',
        description: 'Halaman Manager | Tambah Karyawan',
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
                    <Title name={'Tambah Karyawan'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                        <form onSubmit={(e)=>{postData(e)}} className="needs-validation" noValidate>
                            <div className="row form-row mb-3">
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="kode_karyawan">Kode Karyawan</label>
                                    <input type="number" onChange={handleChangeIDKaryawan} className="form-control" id="kode_karyawan" placeholder="Kode Karyawan" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="kode">Token</label>
                                    <input type="number" onChange={handleChangeKode} className="form-control" id="kode" placeholder="Token" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="nama_karyawan">Nama Karyawan</label>
                                    <input type="text" onChange={handleChangeNamaKaryawan} className="form-control" id="nama_karyawan" placeholder="Nama Karyawan" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="nomor_handphone">Nomor Handphone</label>
                                    <input type="number" onChange={handleChangeNomorHandphone} className="form-control" id="nomor_handphone" placeholder="Nomor Handphone" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-3" htmlFor="form-jenis-kelamin">Jenis Kelamin</label>
                                    <div id="form-jenis-kelamin" className="d-flex flex-row">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" onChange={handleChangeJenisKelamin} type="radio" name="jenis_kelamin" id="Laki-Laki" value="Laki - Laki"/>
                                            <label className="form-check-label" htmlFor="Laki-Laki">Laki - Laki</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jenis_kelamin" onChange={handleChangeJenisKelamin} id="Perempuan" value="Perempuan"/>
                                            <label className="form-check-label" htmlFor="Perempuan">Perempuan</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="tanggal_rekrut">Tanggal Rekrut</label>
                                    <input type="date" onChange={handleChangeTanggalRekrut} className="form-control" id="tanggal_rekrut" placeholder="Tanggal Rekrut" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-3" htmlFor="form-jabatan">Jabatan</label>
                                    <div id="form-jabatan" className="d-flex flex-row">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jabatan" onChange={handleChangeJabatan}  id="Kasir" value="Kasir"/>
                                            <label className="form-check-label" htmlFor="Kasir">Kasir</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jabatan" onChange={handleChangeJabatan}  id="Manager" value="Manager"/>
                                            <label className="form-check-label" htmlFor="Manager">Manager</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jabatan" onChange={handleChangeJabatan}  id="Owner" value="Owner"/>
                                            <label className="form-check-label" htmlFor="Owner">Owner</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-2" htmlFor="alamat">Alamat</label>
                                    <input type="text" onChange={handleChangeAlamat} className="form-control" id="alamat" placeholder="Alamat" required/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="mb-3" htmlFor="form-status">Status</label>
                                    <div id="form-status" className="d-flex flex-row">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" onChange={handleChangeStatus} type="radio" name="status" id="aktif" value="Aktif"/>
                                            <label className="form-check-label" htmlFor="aktif">Aktif</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" onChange={handleChangeStatus} id="non-aktif" value="Non-Aktif"/>
                                            <label className="form-check-label" htmlFor="non-aktif">Non - Aktif</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Tambah</button>
                            <a href="/pos-final/mngr/karyawan" className="btn btn-danger">Kembali</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default TambahKaryawan;