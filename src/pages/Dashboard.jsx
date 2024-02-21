import { useEffect, useState } from 'react';
import TableVisitors from '../components/tables/TableVisitors';
import SearchBar from '../components/SearchBar';
import { useSnackbar } from 'notistack';
import Webcam from "react-webcam";

import FormConfirm from '../components/forms/FormConfirm';
import FormVisitors from '../components/forms/FormVisitors';

import VisitorService from '../services/visitor.service';

export default function Dashboard() {

    const [visitors, setVisitors] = useState([]);
    const [results, setResults] = useState([]);

    const [showConfirm, setShowConfirm] = useState(false);
    const [action, setAction] = useState({});

    const [update, setUpdate] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    useEffect(() => {

        (async () => {
            try {
                const visitors = await VisitorService.findAllPending()
                setVisitors(visitors)
                setResults(visitors)
            } catch (errorMessage) {
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
            }
        })()

    }, [update])

    return (

        <div id="content" className="bg-grey w-100">

            <section className="bg-light py-3">

                <div className="container">

                    <div className="row">

                        <div className="col-lg-9 col-md-8">
                            <h1 className="font-weight-bold mb-0">Visitantes</h1>
                            <p className="lead text-muted">Revisa la última información</p>
                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-mix py-3">

                <div className="container">

                    <div className="card rounded-0">

                        <div className="card-body">

                            <div className="row">

                                <FormConfirm
                                    showConfirm={showConfirm}
                                    setShowConfirm={setShowConfirm}
                                    action={action}
                                    setAction={setAction}
                                    setUpdate={setUpdate}
                                    update={update}
                                />

                                <div className="col-lg-3 col-md-6 stat my-3 d-flex">


                                    <div className="mx-auto d-flex w-100 justify-content-center align-items-center">

                                        <FormVisitors
                                            setShowConfirm={setShowConfirm}
                                            setAction={setAction}
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section>

                <div className="container">

                    <div className="row">

                        <div className="col-lg-12 my-3">

                            <div className="card rounded-0">

                                <div className="card-header bg-light">

                                    <h3 className="h6 fw-bold mb-0">Visitantes ({results && results.length})</h3>

                                </div>

                                <div>

                                    <SearchBar
                                        data={visitors}
                                        setResults={setResults}
                                        propertyName='last_name'
                                    />

                                </div>

                                <div className="card-header">

                                    <TableVisitors
                                        visitors={results}
                                        formConfirm={{
                                            setShowConfirm: setShowConfirm,
                                            setAction: setAction
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    )
}