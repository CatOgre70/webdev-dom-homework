export function validateString(string) {
    return string.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}