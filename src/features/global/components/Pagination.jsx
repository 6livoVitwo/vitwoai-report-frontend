
import React, { useState } from "react";
import { Paginator } from 'primereact/paginator';

export default function Pagination() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    console.log({ first, rows })
    return (
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div>
    );
}
