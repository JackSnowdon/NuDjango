//  Below creates localStorage for Saving/Loading

window.localStorage;

$(document).ready(function() {

    // Player Object

    var player = new Object();
    player.maxHp = 100;
    player.power = 50;

    // Enemy Object

    var enemy = new Object();
    enemy.name = "Steve";
    enemy.maxHp = 100;
    enemy.power = 10;

    // Helper Functions

    // getDieRoll takes amount of "sides" as a parameter

    function getDiceRoll(x) {
        return Math.floor(Math.random() * x) + 1;
    }

    function attack(base, power) {
        return base + power;
    }

    function basicAttack(p) {
        let baseDmg = getDiceRoll(p);
        let modDmg = getDiceRoll(baseDmg) * 2;
        let aDmg = attack(baseDmg, modDmg);
        return aDmg
    }

    // Start Combat 

    function startCombat() {
        $(".name").fadeOut("slow");
        $(".buttons").fadeOut("slow");
        $("#enemyName").text(enemy.name);
        $("#enemyHealth").text(enemy.maxHp);
        setTimeout(function() {
            $(".combat").fadeIn("slow");
        }, 1000);
        $("#attackButton").attr("disabled", false);
    }

    // Checker for endgame

    function areYouDead(hp) {
        return hp <= 0;
    }

    // Restart 

    function resetStats() {
        player.maxHp = 100;
        $("#enemyHealth").html(enemy.maxHp);
        $("#playerHealth").html(player.maxHp);
        $(".combat").fadeOut("slow");
        $(".buttons").fadeIn("slow");
    }

    // Gameplay Flow

    $("#name-sumbit").click(function() {
        // Checks name has value (Trimmed in case of whitespace)
        var playerName = $("#player-name").val();

        if ($.trim(playerName) == '') {
            alert('You surely must have a name!');
        } else {
            player.name = playerName;
        }
        if (typeof player.name !== "undefined") {
            $("#playerName").text(player.name);
            $("#playerHealth").text(player.maxHp);
            setTimeout(function() {
                $(".buttons").fadeIn("slow");
                $(".stat-nav").fadeIn("slow");
            }, 1000);
        }
    });

    $("#startEasy").click(function() {
        enemy.name = "Easy";
        enemy.maxHp = 100;
        startCombat();
    })

    $("#startMedium").click(function() {
        enemy.name = "Medium";
        enemy.maxHp = 150;
        startCombat();
    })

    $("#startHard").click(function() {
        enemy.name = "Hard";
        enemy.maxHp = 200;
        startCombat();
    })

    $("#attackButton").click(function() {
        $("#attackButton").attr("disabled", true);

        // Player Attack 
        attackDmg = basicAttack(player.power)

        // Reduces enemy health and displays results
        enemy.maxHp -= attackDmg;
        $("#enemyHealth").html(enemy.maxHp);

        // Checks if enemy HP is below 0 and ends combat
        if (areYouDead(enemy.maxHp)) {
            $("#enemyHealth").html(0);
            setTimeout(function() {
                resetStats();
            }, 1500);
            return;
        }

        // Enemy Attack

        setTimeout(function() {
            eAttackDmg = basicAttack(enemy.power);

            player.maxHp -= eAttackDmg;
            $("#playerHealth").text(player.maxHp);

            if (areYouDead(player.maxHp)) {
                $("#playerHealth").html(0);
                setTimeout(function() {
                    resetStats()
                }, 1500)
                return;
            }

            $("#attackButton").attr("disabled", false);

        }, 1500);
    })


    $("#rollD6").click(function() {
        var result = getDiceRoll(6);
        $("#d6").text(result);
    });

    // Save System

    $("#save-button").click(function() {

        // Confirms if player wants to save progress

        var saveCheck = confirm("Saving will overwrite " + player.name + "'s save, press OK to confirm");
        if (saveCheck == true) {
            save();
        } else {
            alert("Game not saved");
        }
    });

    $("#load-button").click(function() {

        // Confirms player wants to load local save

        var loadCheck = confirm("Load your save file? (This will overwrite your current save)");
        if (loadCheck == true) {
            load();

            // Loads from local storage and sets player stats
        } else {
            alert("Game not loaded");
        }
    });

    function save() {

        // Stores player info as JSON and saves to local storage

        var save = {
            playerPower: player.power,
            playerHp: player.maxHp,

        };
        localStorage.setItem("save", JSON.stringify(save));
    }

    function load() {

        // Retrives from local storage

        var saveGame = JSON.parse(localStorage.getItem("save"));
        if (saveGame != null && saveGame != undefined) {
            player.power = saveGame.playerPower;
            player.maxHp = saveGame.playerHp;
        }
    }


});