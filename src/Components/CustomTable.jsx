import React from 'react';

function CustomTable({columns, rows}) {
    return (
        <table className="w-full" >
            <thead className="w-full bg-gray-200">
                <tr className=" w-full text-left border-b border-gray-300">
                    {columns.map((column, index) => (
                        <th key={index} scope="col" className="py-2 px-3">{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {
                rows.length ?
                rows.map((row, index) => (
                    <tr key={index} className="w-full border-b border-gray-300">
                        {
                            columns.map((column, index) => (
                                <td key={index} className="py-2 px-5">{row[column.code]}</td>
                            ))
                        }
                    </tr>
                )) :
                <div>
                    Aucune donnée disponible
                </div>
            }
            </tbody>
        </table>
    );
}

export default CustomTable;