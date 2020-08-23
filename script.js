function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(lyricData => {
            const lyrics = lyricData.lyrics;
            
            if (lyrics == undefined) {
                alert(`Sorry, We can't find '${title}' Lyrics in our API. Please try some outher songs.`);
            } else {
                    const lyricesDisplay = document.getElementById('single-lyrics');
                    lyricesDisplay.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
                                                <pre class="lyric text-white">${lyrics}</pre>`
            }
        })
        document.getElementById('search-result').innerHTML = ''; // close song suggestions staff
}
// enter button event handeler
document.getElementById('song-name-input').addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        searchResult();
    }
  });


function searchResult() {
    const songName = document.getElementById('song-name-input').value;
    if (songName.length == 0) {
        alert('please enter your artist or Song')
    } else {
        document.getElementById('search-result').innerHTML = ''; // for remove previously searched songs
        document.getElementById('single-lyrics').innerHTML = ''; // for close previously opened Lyrics
        fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(res => res.json())
        .then(apiData => {
            const songs = apiData.data;
            for (let i = 0; i < songs.length; i++) {
                const song = songs[i];
                const title = song.title;
                const artist = song.artist.name;
                const type = song.type;
                const img = song.artist.picture_medium;
    // result template           
                const result = document.getElementById('search-result');
                result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                            <div class="col-md-3 col-sm-2 col-4">
                                            <img class="img-thumbnail" src="${img}" alt="Cover Picture">
                                            </div>
                                            <div class="col-md-6 col-sm-7 col-8">
                                            <h3 class="lyrics-name">${title}</h3>
                                            <p class="author lead">${type} by <span>${artist}</span></p>
                                        </div>
                                        <div class="col-md-3 col-sm-3 text-md-right text-center">
                                            <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                                        </div>
                                    </div>`
            }
        })
        }
}
