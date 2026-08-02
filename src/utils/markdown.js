export function stripMarkdown(text = "") {
    return text
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/[*_`>]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

export function excerpt(text = "", maxLength = 140) {
    const plain = stripMarkdown(text);
    return plain.length > maxLength ? `${plain.slice(0, maxLength).trim()}…` : plain;
}
