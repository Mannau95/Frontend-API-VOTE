import React from 'react';
import {ChevronLeft, ChevronRight, CloudUpload} from "lucide-react";
import Button from "../Button.jsx";

function TablePagination({currentPage = 1, rows, pageSize, setPage, setPaginatedRows}) {
    const totalPages = Math.ceil(rows?.length / pageSize);

    return (
        <div className="flex gap-2 pt-6 justify-between px-6">
            <div>
                Page de {currentPage} à {totalPages} sur {totalPages}
            </div>

            <div className="flex gap-2 items-center justify-end">
                <Button
                    onClick={() => {
                        if(currentPage > 1 ) {
                            setPage(currentPage - 1);
                            setPaginatedRows(rows?.slice((currentPage - 2) * pageSize, (currentPage - 1) * pageSize - 1));
                        }
                    }}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={15}/>
                    Précédant
                </Button>

                <div className="border rounded-sm py-1 px-3">
                    {currentPage}
                </div>

                <Button
                    onClick={() => {
                        if( currentPage < totalPages ) {
                            setPage(currentPage + 1);
                            setPaginatedRows(rows?.slice((currentPage - 1) * pageSize, (currentPage) * pageSize - 1));
                        }
                    }}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={15}/>
                    Suivant
                </Button>
            </div>
        </div>
    );
}

export default TablePagination;