import { Helmet } from "react-helmet";

const Home = () => {
    return(
        <div className="login-pages">
            <Helmet>
                <title>Login | P.O.S</title>
            </Helmet>
            <div className="container">
                <div className="row-header"></div>
                <div className="row row-login">
                    <div className="col-lg-4 login-column offset-4 p-5 border rounded bg-white">
                        <form>
                            <div class="form-group mb-4">
                                <label className="login-label mb-2" for="token-id">Token</label>
                                <input type="password" className="form-control" id="token-id" placeholder="Masukkan Token"/>
                            </div>
                            <button type="submit" className="btn col-12 bg-dsb">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;