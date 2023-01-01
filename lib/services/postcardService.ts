async function getAllPostcards() {
    return fetch("/api/allPostcards").then((res) => res.json());
} 

async function postPostcard(author : string, content : string, sticker : number) {
    return fetch("/api/postcard", {
        method : "POST",
        body : JSON.stringify({ author, content, sticker })
    }).then((res) => res.json())
}

async function likePostcard(id : string) {
    return fetch(`/api/postcard/${id}`, {
        method : "PUT",
        body : JSON.stringify({ id })
    }).then((res) => res.json())
}

let postcardService = {
    getAllPostcards,
    postPostcard,
    likePostcard
}

export default postcardService