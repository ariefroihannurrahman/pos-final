import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Produk = () => {
    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager | Produk Produk',
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
                    <Title name={'Produk'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <div className="row text-content">
                                <div className="col-6">
                                    <h3>Detail Produk</h3>
                                </div>
                                <div className="col-6 text-end">
                                    <a className="btn btn-info cl-white mb-3" href="produk/t">Tambah Produk</a>
                                </div>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Kode Produk</th>
                                        <th scope="col">Nama Produk</th>
                                        <th scope="col">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>lokal</td>
                                        <td>
                                            <a className="btn btn-primary" href={`produk/e`}>Edit</a>
                                            <a className="btn btn-danger" href={"/"}>Delete</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentMeta>
    );
}

export default Produk;