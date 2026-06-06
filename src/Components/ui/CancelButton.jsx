import React from "react";

export default function CancelButton({handleModalClose, label="Annuler"}){
    return <button
        type="button"
        onClick={handleModalClose}
        className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200
                  rounded-lg hover:bg-gray-50 transition-colors"
    >
        {label}
    </button>
}