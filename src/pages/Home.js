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
                            <div class="form-group mb-2">
                                <label className="login-label mb-2" for="token-id">Token</label>
                                <input type="password" className="form-control" id="token-id" placeholder="Masukkan Token"/>
                            </div>
                            <div className="form-check p-0 mb-4">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="as" id="kasir-option-id" value="kasir"/>
                                    <label className="form-check-label" for="kasir-option-id">Kasir</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="as" id="manager-option-id" value="manager"/>
                                    <label className="form-check-label" for="manager-option-id">Manager</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="as" id="owner-option-id" value="Owner"/>
                                    <label className="form-check-label" for="owner-option-id">Owner</label>
                                </div>
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