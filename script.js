function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(lyricData => {
            const lyrics = lyricData.lyrics;
            const lyricesDisplay = document.getElementById('single-lyrics');
            lyricesDisplay.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
                                        <pre class="lyric text-white">${lyrics}</pre>`
        })
        document.getElementById('search-result').innerHTML = '';
}



function searchResult() {
    const songName = document.getElementById('song-name-input').value;
    document.getElementById('search-result').innerHTML = '';
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(apiData => {
        const songs = apiData.data;
        for (let i = 0; i < 10; i++) {
            const song = songs[i];
            const title = song.title;
            const artist = song.artist.name;
            const type = song.type;

            const result = document.getElementById('search-result');
            result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                    <div class="col-md-9">
                                        <h3 class="lyrics-name">${title}</h3>
                                        <p class="author lead">${type} by <span>${artist}</span></p>
                                    </div>
                                    <div class="col-md-3 text-md-right text-center">
                                        <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                                    </div>
                                </div>`
        }
    })
}
