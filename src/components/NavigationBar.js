import { useNavigate } from "react-router-dom";


const NavigationBar = () => {
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.clear();
        navigate("/")
    }

    return(
        <>
            <div className="container navigation-bar m-0 p-3 mt-3 shadow">
                <h1 
                    className="text-center mb-4"
                >P.O.S</h1>
                <div className="list-group mb-3">
                    <a 
                        href="/pos-final/mngr/dashboard"
                        className="list-group-item list-group-item-action dashboard" 
                        aria-current="true"
                        >Dashboard</a>

                    <a 
                        href="/pos-final/mngr/penjualan"
                        className="list-group-item list-group-item-action penjualan"
                    >Penjualan</a>

                    <a 
                        href="/pos-final/mngr/produk" 
                        className="list-group-item list-group-item-action produk"
                    >Produk</a>
                    
                    <a 
                        href="/pos-final/mngr/kategori" 
                        className="list-group-item list-group-item-action kategori"
                    >Kategori</a>
                    
                    <a 
                        href="/pos-final/mngr/jenis" 
                        className="list-group-item list-group-item-action jenis"
                    >Jenis</a>
                    
                    <a 
                        href="/pos-final/mngr/karyawan" 
                        className="list-group-item list-group-item-action karyawan"
                    >Karyawan</a>
                </div>
                <div className="list-group mb-3">
                    <a  onClick={logoutUser}
                        href="/pos-final/" 
                        className="list-group-item list-group-item-action mt-2 karyawan"
                    >Logout</a>
                </div>
            </div>
        </>
    );
}

export default NavigationBar;