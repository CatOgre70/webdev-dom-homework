const baseUrl = "https://wedev-api.sky.pro/api/v1/vasily-demin/comments";
export function postComment(newComment){
    return fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(newComment)
    });
}

export function getCommentList() {
    return fetch(baseUrl, {
        method: "GET"
    });
}

export function deleteComment(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
}

export function toggleLike(id) {
    return fetch(`${baseUrl}/${id}/toggle-like`, {
        method: "POST"
    });
}