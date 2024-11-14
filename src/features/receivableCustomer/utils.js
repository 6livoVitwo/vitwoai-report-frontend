import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

export const exportToExcel = () => {
    const table = document.getElementById('receivable-table');

    // Optional: Temporarily apply styling to ensure content fits
    const originalStyles = table.style.cssText;
    table.style.width = 'auto';
    table.style.overflow = 'visible';

    // Capture the table's rows and columns
    const rows = table.querySelectorAll('tr');
    const tableData = [];

    // Iterate over rows to get cell data
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('th, td');
        cells.forEach(cell => {
            rowData.push(cell.innerText);
        });
        tableData.push(rowData);
    });

    // Create a worksheet using the data collected from the table
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Receivable Data');

    // Write the workbook to a file and trigger download
    XLSX.writeFile(workbook, 'ReceivableData.xlsx');

    // Restore original table styling after capture
    table.style.cssText = originalStyles;
};

export const exportToPDF = () => {
    const table = document.getElementById('receivable-table');

    // Capture the table content
    const rows = table.querySelectorAll('tr');
    const tableData = [];

    // Loop through the rows and get each cell value
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('th, td');
        cells.forEach(cell => {
            rowData.push(cell.innerText);
        });
        tableData.push(rowData);
    });

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define table columns and headers
    const columns = tableData[0].map(header => header);
    const data = tableData.slice(1);

    // Use jsPDF autoTable to create the table in the PDF
    doc.autoTable({
        head: [columns],
        body: data,
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [0, 100, 255] },
        margin: { top: 20 }
    });

    // Save the PDF with the specified file name
    doc.save('ReceivableData.pdf');
};


export const exportToImage = () => {
    const table = document.getElementById('receivable-table');

    // Optional: Temporarily apply styling to make sure all content fits
    const originalStyles = table.style.cssText;
    table.style.width = 'auto';
    table.style.overflow = 'visible';

    // Use html2canvas to capture the entire table
    html2canvas(table, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: table.scrollWidth,
        windowHeight: table.scrollHeight,
    })
        .then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'ReceivableData.png';
            link.click();

            // Restore original table styling after capture
            table.style.cssText = originalStyles;
        })
        .catch((error) => {
            console.error('Error capturing image:', error);
            table.style.cssText = originalStyles;
        });
};