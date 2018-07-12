
function a() {fetch("https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=brioni", {
    headers: {
        Authorization: '97ed1dc2fe1203d00c0636f961ab577a'
    }
}).then(response => response.json())
    .then(logIt);
}
a()

function logIt(data) {
    console.log(data)
}

