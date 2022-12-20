import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";
import NavigationBar from "../../../components/NavigationBar";
import Title from "../../../components/Title";

const Jenis = () => {
    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager | Jenis Produk',
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
                    <Title name={'Jenis'} />
                    <div className="row mb-3">
                        <div className="col p-5 bg-white rounded shadow">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Kode Jenis</th>
                                        <th scope="col">Jenis</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>097</td>
                                        <td>Makanan</td>
                                        <td>
                                            <a className="btn btn-primary" href={`jenis/e`}>Edit</a>
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

export default Jenis;