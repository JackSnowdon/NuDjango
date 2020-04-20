//  Below creates localStorage for Saving/Loading

window.localStorage;

$(document).ready(function() {

    // Player Object

    var player = new Object();
    player.maxHp = 0;
    player.currentHp = 0;
    player.power = 0;
    player.speed = 0;
    player.gold = 0;
    player.xp = 0;
    player.level = 1;

    // Setup Functions

    function setPlayerStats() {
        player.name = $("#hero-name").text();
        player.maxHp = $("#hero-max-hp").text();
        player.currentHp = $("#hero-current-hp").text();
        player.power = $("#hero-power").text();
        player.speed = $("#hero-speed").text();
        player.gold = $("#hero-gold").text();
        player.xp = $("#hero-xp").text();
        player.level = $("#hero-level").text();
        console.log(player);
    };

    setPlayerStats();
});