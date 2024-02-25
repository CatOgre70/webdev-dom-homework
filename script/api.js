export function putComment(baseUrl, newComment){
    return fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(newComment)
    });
}

export function getCommentList(baseUrl) {
    return fetch(baseUrl, {
        method: "GET"
    });
}