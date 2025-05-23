function searchSongs() {
    const userQuery = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    if (!userQuery) {
        resultsDiv.innerHTML = 'Please enter a search term.';
        return;
    }

    // Auto-enhance query with "Telugu Christian"
    const fullQuery = `${userQuery} Telugu Christian`;

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(fullQuery)}&entity=song&genreId=1094&limit=15`)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = '';
            if (data.results.length === 0) {
                resultsDiv.innerHTML = 'No Telugu Christian songs found.';
                return;
            }

            data.results.forEach(song => {
                const songDiv = document.createElement('div');
                songDiv.className = 'song';
                songDiv.innerHTML = `
                    <img src="${song.artworkUrl100}" alt="Album Art">
                    <div>
                        <strong>${song.trackName}</strong><br>
                        <em>${song.artistName}</em><br>
                        <audio controls src="${song.previewUrl}"></audio>
                    </div>
                `;
                resultsDiv.appendChild(songDiv);
            });
        })
        .catch(err => {
            console.error(err);
            resultsDiv.innerHTML = 'Error fetching results.';
        });
}
