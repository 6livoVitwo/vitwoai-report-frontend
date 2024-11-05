
import React from "react";
import { Paginator } from 'primereact/paginator';

export default function Pagination({ first, totalRecords, rows, rowsPerPageOptions, onPageChange }) {

    return (
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={rowsPerPageOptions} onPageChange={onPageChange} />
        </div>
    );
}
