import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const LaporanAwal = () => {
    const navigate = useNavigate();
    const [dataKasir, setDataKasir] = useState([]);
    const [nominal, setNominal] = useState();
    const [error, setError] = useState();

    // useEffect(() => {
    //     if (localStorage.getItem("datalaporan")) {
    //       navigate("/kasir-transaksi");
    //     }else{
    //         navigate("/")
    //     }
    //   }, []);
    
    const getDataKasir = async () => {
        try {
          const data = await localStorage.getItem("datakasir");
          await setDataKasir(JSON.parse(data));
        } catch (error) {}
    };

    useEffect(()=>{
        getDataKasir();
    }, []);

    const SaveLaporanAwal = async (e) => {
        try{
            e.preventDefault();
            const res = await axios.post('http://localhost:5000/add-laporan-awal',{
                id_session : dataKasir.idsession,
                no_karyawan : dataKasir.idkasir,
                laporan_awal : nominal
            });
            const dataLaporan = {
                laporanawal : res.data.laporanawal
            };

            await localStorage.setItem("datalaporan", JSON.stringify(dataLaporan));
            navigate("/kasir-transaksi")
        }catch (error) {
            setError(error.response.data.message);
            alert("Kode Salah")
        }
    }


    return(
        <div className="container">
            <p>{dataKasir.namakasir}</p>
            <form onSubmit={SaveLaporanAwal}>
                <div className="row">
                    <div className="col-4 offset-4 mt-150px">
                        <div className="form-outline mb-4">
                            <label className="form-label" for="laporan_awal">Masukkan Nominal Laporan Awal</label>
                            <input type="text" id="laporan-awal" className="form-control" value={nominal} onChange={(e) => setNominal(e.target.value)}/>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-primary btn-block mb-4"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LaporanAwal;