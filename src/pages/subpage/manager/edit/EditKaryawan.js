import axios from "axios";
import React, { useState, useEffect } from 'react';
import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const EditKaryawan = () => {
    const serverHost = 'http://localhost:5000/';
    const [dataKaryawan, setDataKaryawan] = useState('');
    const [IDKaryawan, setIDKaryawan] = useState();
    const [namaKaryawan, setNamaKaryawan] = useState();
    const [nomorHandphone, setNomorHandphone] = useState();
    const [jenisKelamin, setJenisKelamin] = useState();
    const [tanggalRekrut, setTanggalRekrut] = useState();
    const [jabatan, setJabatan] = useState();
    const [kode, setKode] = useState();
    const [status, setStatus] = useState();
    const [alamat, setAlamat] = useState();
    const {no_karyawan} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(serverHost + 'API/karyawan')
            .then(
                response => {
                    // console.log(response.data);
                    setDataKaryawan(response.data);
                    response.data.map((karyawan, index)=>{
                        if(karyawan.no_karyawan === parseInt(no_karyawan)){
                            setIDKaryawan(karyawan.id_karyawan);
                            setNamaKaryawan(karyawan.nama_karyawan);
                            setNomorHandphone(karyawan.nomor_handphone);
                            setJenisKelamin(karyawan.jenis_kelamin);
                            setTanggalRekrut(karyawan.tanggal_rekrut.split("T")[0]);
                            setJabatan(karyawan.jabatan);
                            setKode(karyawan.kode);
                            setStatus(karyawan.status);
                            setAlamat(karyawan.alamat);
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
    }, [])
    

    const postData = (e) => {
        if((isNaN(namaKaryawan && jenisKelamin && status && tanggalRekrut && alamat && jabatan)) && (nomorHandphone && kode && IDKaryawan !== undefined) && (status && jabatan && tanggalRekrut && alamat !== undefined))
        {
        if(IDKaryawan && nomorHandphone && kode >= 0) {
            const tanggalrekrut = new Date(tanggalRekrut);
            console.log(tanggalrekrut.toLocaleDateString('id-ID'));
            if (namaKaryawan !== undefined) {
                e.preventDefault();
                axios
                    .post(serverHost + 'API/post/karyawan', {
                        no_karyawan:no_karyawan,
                        id_karyawan:IDKaryawan,
                        nama_karyawan:namaKaryawan,
                        nomor_handphone:nomorHandphone,
                        jenis_kelamin:jenisKelamin,
                        tanggal_rekrut:tanggalrekrut,
                        jabatan:jabatan,
                        kode:kode,
                        status:status,
                        alamat:alamat,
                    })
                    .then(
                        response => {
                            console.log(response);
                            navigate('/pos-final/mngr/karyawan');
                        }
                    )
                    .catch(
                        error => {
                            console.log(error);
                        }
                    )
                }
            }
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
        description: 'Halaman Manager | Edit Karyawan',
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
                    <Title name={'Edit Karyawan'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <form onSubmit={(e)=>{postData(e)}} className="needs-validation" noValidate>
                                <div className="row form-row mb-3">
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="kode_karyawan">Kode Karyawan</label>
                                        <input type="number" className="form-control" id="kode_karyawan" value={IDKaryawan} onChange={handleChangeIDKaryawan} required/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="nama_karyawan">Nama Karyawan</label>
                                        <input type="text" className="form-control" id="nama_karyawan" value={namaKaryawan} onChange={handleChangeNamaKaryawan} required/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="nomor_handphone">Nomor Handphone</label>
                                        <input type="number" className="form-control" id="nomor_handphone" value={nomorHandphone} onChange={handleChangeNomorHandphone} required/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-3" htmlFor="form-jenis-kelamin">Jenis Kelamin</label>
                                        <div id="form-jenis-kelamin" className="d-flex flex-row">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="jenis_kelamin" onChange={handleChangeJenisKelamin} checked={jenisKelamin === "Laki - Laki" ? (true) : (false)} id="Laki - Laki" value="Laki - Laki"/>
                                                <label className="form-check-label" htmlFor="Laki - Laki">Laki - Laki</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="jenis_kelamin" onChange={handleChangeJenisKelamin} checked={jenisKelamin === "Perempuan" ? (true) : (false)} id="Perempuan" value="Perempuan"/>
                                                <label className="form-check-label" htmlFor="Perempuan">Perempuan</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="tanggal_rekrut">Tanggal Rekrut</label>
                                        <input type="date" className="form-control" id="tanggal_rekrut" value={tanggalRekrut} onChange={(e)=>{setTanggalRekrut(e.target.value)}} required/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-3" htmlFor="form-jabatan">Jabatan</label>
                                        <div id="form-jenis-kelamin" className="d-flex flex-row">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" checked={jabatan === "Kasir" ? (true):(false)} onChange={handleChangeJabatan} name="jabatan" id="kasir" value="Kasir"/>
                                                <label className="form-check-label" htmlFor="Kasir">Kasir</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" checked={jabatan === "Manager" ? (true):(false)} name="jabatan" onChange={handleChangeJabatan} id="Manager" value="Manager"/>
                                                <label className="form-check-label" htmlFor="Manager">Manager</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" checked={jabatan === "Owner" ? (true):(false)} onChange={handleChangeJabatan} type="radio" name="jabatan" id="Owner" value="Owner"/>
                                                <label className="form-check-label" htmlFor="Owner">Owner</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="kode">Kode</label>
                                        <input type="number" className="form-control" id="kode" onChange={(e)=>{setKode(e.target.value)}} value={kode} required/>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-3" htmlFor="form-status">Status</label>
                                        <div id="form-status" className="d-flex flex-row">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" onChange={handleChangeStatus} type="radio" name="status" checked={status === "Aktif" ? (true):(false)} id="Aktif" value="Aktif"/>
                                                <label className="form-check-label" htmlFor="Aktif">Aktif</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" checked={status === "Non-Aktif" ? (true):(false)} onChange={handleChangeStatus} type="radio" name="status" id="Non - Aktif" value="Non - Aktif"/>
                                                <label className="form-check-label" htmlFor="Non - Aktif">Non - Aktif</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="mb-2" htmlFor="alamat">Alamat</label>
                                        <input type="text" className="form-control" id="alamat" value={alamat} onChange={(e)=>{setAlamat(e.target.value)}} required/>
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit">Edit</button>
                                <a href="/pos-final/mngr/karyawan" className="btn btn-danger">Kembali</a> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default EditKaryawan;