import { Link } from 'react-router-dom';
import TableDataGrid from './TableDataGrid';
import Button from 'react-bootstrap/esm/Button';
import moment from 'moment';

import VisitorService from '../../services/visitor.service';

export default function TableVisitors({ visitors, formConfirm }) {

    const handleExit = (visitor_id) => {

        const {setAction, setShowConfirm} = formConfirm

        setAction({
            service: VisitorService.update,
            params: [visitor_id, { exit: new Date() }]
        })

        setShowConfirm(true)

    }

    const columns = [
        { 
            field: 'name', 
            headerName: 'Visitante', 
            renderCell: (params) => (<Link to={`/visitor/${params.row.visitor_id}`}>{params.row.last_name + ' ' + params.row.name}</Link>),
            valueGetter: (params) => params.row.name + ' ' + params.row.last_name,  
            flex: 2,
        },
        { field: 'employee', headerName: 'Empleado', flex: 2 },
        { field: 'document_type', headerName: 'Tipo Doc' },
        { field: 'document_number', headerName: 'Documento' },
        { 
            field: 'entry', 
            headerName: 'Entrada',
            renderCell: (params) => (moment.utc(params.row.entry).format('HH:mm'))
        },
        {
            field: 'exit',
            headerName: 'Salida',
            flex: 1,
            renderCell: (params) => (
                <Button
                    onClick={() => handleExit(params.row.visitor_id)}
                    variant="primary"
                    type='submit'
                    className="btn "
                >
                    Marcar Salida
                </Button>
            )
        },
    ];

    return (

        <TableDataGrid
            columns={columns}
            rows={visitors}
            rowIdName={'visitor_id'}
        />

    );

}