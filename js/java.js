
















































// scroller at top of page
document.addEventListener('DOMContentLoaded', function () {
    const scrollerInner = document.querySelector('.scroller__inner');

    const imageUrls = [
        "https://a.espncdn.com/i/teamlogos/nba/500/atl.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/bkn.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/cha.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/chi.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/cle.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/dal.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/den.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/det.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/hou.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/ind.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/lac.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/mem.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/mia.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/mil.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/no.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/ny.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/okc.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/orl.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/phi.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/phx.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/por.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/sac.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/sa.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/tor.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/utah.png",
        "https://a.espncdn.com/i/teamlogos/nba/500/wsh.png"
    ];

    function populateScroller() {
        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'NBA Team Logo';
            scrollerInner.appendChild(img.cloneNode(true));
        });
    }

    populateScroller();

    scrollerInner.addEventListener('animationiteration', () => {
        const images = scrollerInner.querySelectorAll('img');
        images.forEach(img => {
            scrollerInner.appendChild(img.cloneNode(true));
        });
    });
});

// search player

// search team