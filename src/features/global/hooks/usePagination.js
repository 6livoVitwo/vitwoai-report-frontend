import { useState } from "react"

export const usePagination = (initialRows = 10) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(initialRows);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    }

    return { first, rows, onPageChange };
}