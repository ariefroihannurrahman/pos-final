import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../../components/NavigationBar";
import Title from "../../../../components/Title";

const TambahJenis = () => {
    const meta = {
        title: 'Tambah Jenis | P.O.S',
        description: 'Halaman Manager | Tambah Jenis Produk',
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
                    <Title name={'Tambah Jenis'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <form class="needs-validation" novalidate>
                                <div class="row form-row mb-3">
                                    <div class="col-6 mb-3">
                                        <label className="mb-2" for="kode_jenis">Kode Jenis</label>
                                        <input type="text" class="form-control" id="kode_jenis" placeholder="Kode Jenis" required/>
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <label className="mb-2" for="nama_jenis">Jenis</label>
                                        <input type="text" class="form-control" id="nama_jenis" placeholder="Jenis" required/>
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-primary" type="submit">Edit</button>
                                <a href="/pos-final/mngr/jenis" class="btn btn-danger">Kembali</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default TambahJenis;