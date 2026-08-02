import { useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { FieldWrapper } from "./Form.jsx";

const TOOLBAR = [
    "bold", "italic", "heading", "|",
    "quote", "unordered-list", "ordered-list", "|",
    "link", "preview", "guide",
];

export function MarkdownField({ label, hint, error, value, onChange, placeholder }) {
    // options must be a stable reference: react-simplemde-editor re-creates
    // the editor instance whenever the options object identity changes.
    const options = useMemo(() => ({
        placeholder,
        spellChecker: false,
        status: false,
        toolbar: TOOLBAR,
    }), [placeholder]);

    return (
        <FieldWrapper label={label} hint={hint} error={error}>
            <SimpleMDE value={value} onChange={onChange} options={options} />
        </FieldWrapper>
    );
}
