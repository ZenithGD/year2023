
async function getAllPostcards() {
    return fetch("/api/allPostcards").then((res) => res.json());
} 

async function postPostcard(author : string, content : string, sticker : number) {
    return fetch("/api/postcard", {
        method : "POST",
        body : JSON.stringify({ author, content, sticker })
    }).then((res) => res.json())
}

let postcardService = {
    getAllPostcards,
    postPostcard
}

export default postcardService