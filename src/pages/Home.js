import { Helmet } from "react-helmet";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [kode, setKode] = useState('');
    const [isLogin, setIsLogin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("datakasir")) {
            navigate("/kasir-transaksi");
        }
    }, []);

    const LoginKasir = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:5000/auth', {
            kode: kode
        });

        if (res.data.login == true) {
            const dataLogin = {
                idsession: res.data.sessionid,
                idkasir: res.data.idkasir,
                namakasir: res.data.namakasir,
                jabatan : res.data.jabatan
            };
            localStorage.setItem("datakasir", JSON.stringify(dataLogin));
            if(res.data.jabatan == "Kasir"){
                navigate("/laporan-awal")
            }else if(res.data.jabatan == "Manager"){
                navigate("/pos-final/mngr/dashboard")
            }else if(res.data.jabatan == "Owner"){
                navigate("/pos-final/ownr")
            }else{
                console.log(res.data.jabatan)
            }
        } else {
            alert("Token Salah")
            setKode('');
        }
    }


    return (
        <div className="login-pages">
            <Helmet>
                <title>Login | P.O.S</title>
            </Helmet>
            <div className="container">
                <div className="row-header"></div>
                <div className="row row-login">
                    <div className="col-lg-4 login-column offset-4 p-5 border rounded bg-white">
                        <form onSubmit={LoginKasir}>
                            <div class="form-group mb-4">
                                <label className="login-label mb-2" for="token-id">Token</label>
                                <input type="password" className="form-control" id="token-id" placeholder="Masukkan Token" value={kode} onChange={(e) => setKode(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn col-12 bg-dsb mt-3" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;