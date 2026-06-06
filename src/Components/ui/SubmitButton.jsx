import React from "react";

export default function SubmitButton({isSubmitting, loadingText = 'En cours...', label="Valider" }) {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] py-2.5 text-sm font-medium text-white bg-blue-600
                  rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all
                  disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {isSubmitting ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {loadingText}
                </>
            ) : (
                label
            )}
        </button>
    )
}