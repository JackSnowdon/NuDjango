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

    function getPlayerStats() {
        player.name = $("#hero-name").text();
        player.maxHp = $("#hero-max-hp").text();
        player.currentHp = $("#hero-current-hp").text();
        player.power = $("#hero-power").text();
        player.speed = $("#hero-speed").text();
        player.gold = $("#hero-gold").text();
        player.xp = $("#hero-xp").text();
        player.level = $("#hero-level").text();
    };

    function getEnemyStats() {
        enemy.name = $("#enemy-name").text();
        enemy.maxHp = $("#enemy-max-hp").text();
        enemy.currentHp = $("#enemy-current-hp").text();
        enemy.power = $("#enemy-power").text();
        enemy.speed = $("#enemy-speed").text();
        enemy.gold = $("#enemy-gold").text();
        enemy.xp = $("#enemy-xp").text();
        enemy.level = $("#enemy-level").text();
    }

    getPlayerStats();
    getEnemyStats();


    // Combat Functions 


    function getDiceRoll(x) {
        return Math.floor(Math.random() * x) + 1;
    }

    function areYouDead(hp) {
        return hp <= 0;
    }

    function basicAttack(user) {
        return Math.floor((user.power / 2) + getDiceRoll(user.power))
    }


    // Action Actions


    function playerAttackRound() {
        let atck = basicAttack(player);
        enemy.currentHp -= atck;
        $("#enemy-current-hp").html(enemy.currentHp);
        $("#player-result").html(player.name + " Hits " + enemy.name + " for " + atck + " Hit Points!");
    }

    function enemyAttackRound() {
        let atck = basicAttack(enemy);
        player.currentHp -= atck;
        $("#hero-current-hp").html(player.currentHp);
        $("#enemy-result").html(enemy.name + " Hits " + player.name + " for " + atck + " Hit Points!");
    }


    // Gameplay Flow

    $("#attack-button").click(function() {
        $("#attack-button").attr("disabled", true);
        playerAttackRound()
        if (areYouDead(enemy.currentHp)) {
            $("#enemy-current-hp").html(0)
            $("#win-results").html(player.name + " Wins!")
            $("#win-return-button").show()
        } else {

            // Enemy Turn

            setTimeout(function() {
                enemyAttackRound()
                if (areYouDead(player.currentHp)) {
                    $("#hero-current-hp").html(0);
                    $("#win-results").html(enemy.name + " Wins!")
                    $("#lose-return-button").show()
                } else {
                    $("#attack-button").attr("disabled", false);
                }
            }, 1500)
        }
    })
});