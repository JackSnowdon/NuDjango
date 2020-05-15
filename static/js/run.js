//  Below creates localStorage for Saving/Loading

window.localStorage;

$(document).ready(function() {

    // Objects for every fighter

    function Combatant(maxHp, currentHp, power, speed, gold, xp, level) {
        this.maxHp = maxHp;
        this.currentHp = currentHp;
        this.power = power;
        this.speed = speed;
        this.gold = gold;
        this.xp = xp;
        this.level = level;
    }

    let player = new Combatant(0, 0, 0, 0, 0, 0, 0)
    let enemy = new Combatant(0, 0, 0, 0, 0, 0, 0)

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
    };

    function setEnemyStats() {
        enemy.name = $("#enemy-name").text();
        enemy.maxHp = $("#enemy-max-hp").text();
        enemy.currentHp = $("#enemy-current-hp").text();
        enemy.power = $("#enemy-power").text();
        enemy.speed = $("#enemy-speed").text();
        enemy.gold = $("#enemy-gold").text();
        enemy.xp = $("#enemy-xp").text();
        enemy.level = $("#enemy-level").text();
    }

    function getDiceRoll(x) {
        return Math.floor(Math.random() * x) + 1;
    }

    function areYouDead(hp) {
        return hp <= 0;
    }

    $("#attackButton").click(function() {
        takeHP();
    })

    setPlayerStats();
    setEnemyStats();
    console.log(player)
    console.log(enemy)

});