import DocumentMeta from "react-document-meta";
import {Helmet} from "react-helmet";

const Manager = () => {
    const meta = {
        title: 'P.O.S',
        description: 'Halaman Manager',
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
        </DocumentMeta>
    );
}

export default Manager;