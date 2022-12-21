import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const LaporanAkhir = () => {

    const navigate = useNavigate();
    const [dataKasir, setDataKasir] = useState([]);
    const [dataLaporan, setDataLaporan] = useState([]);
    const [nominal, setNominal] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (localStorage.getItem("datalaporan")) {
          console.log("ok")
        }else{
            navigate("/")
        }
      }, []);
    
    const getDataKasir = async () => {
        try {
          const data = await localStorage.getItem("datakasir");
          await setDataKasir(JSON.parse(data));
        } catch (error) {}
    };

    const getDataLaporan = async () => {
        try {
          const data = await localStorage.getItem("datalaporan");
          await setDataLaporan(JSON.parse(data));
        } catch (error) {}
    };

    useEffect(()=>{
        getDataKasir();
        getDataLaporan();
    }, []);

    const SaveLaporanAkhir = async (e) => {
        try{
            e.preventDefault();
            const res = await axios.post('http://localhost:5000/add-laporan-akhir',{
                id_session : dataKasir.idsession,
                laporan_akhir : nominal
            });
            await localStorage.clear();
            navigate("/")
        }catch (error) {
            setError(error.response.data.message);
            alert("Kode Salah")
        }
    }

    return(
        <div className="container">
            <p>Buat Nama Karyawan</p>
            <form onSubmit={SaveLaporanAkhir}>
                <div className="row">
                    <div className="col-4 offset-4 mt-150px">
                        <div className="form-outline mb-4">
                            <label className="form-label" for="laporan_awal">Laporan Awal</label>
                            <input type="text" id="laporan-awal" value={dataLaporan.laporanawal} className="form-control"/>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="laporan_akhir">Laporan Akhir</label>
                            <input type="text" id="laporan-akhir" className="form-control" value={nominal} onChange={(e) => setNominal(e.target.value)}/>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-primary btn-block mb-4"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LaporanAkhir;