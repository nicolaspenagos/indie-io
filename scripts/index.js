const buttons = document.querySelectorAll('.button');

let linksMap = new Map();
linksMap.set(1, 'https://na.leagueoflegends.com/es-mx/');
linksMap.set(2, 'https://teamfighttactics.leagueoflegends.com/es-mx/');
linksMap.set(3, 'https://playruneterra.com/en-us/');
linksMap.set(4, 'https://playvalorant.com');
linksMap.set(5, 'http://www.cupheadgame.com');


buttons.forEach(function(valor, indice) {
    function handleButtonClick() {
        window.open(linksMap.get(indice), "New link", "width=300, height=200");
    }
    valor.addEventListener('click', handleButtonClick);
});