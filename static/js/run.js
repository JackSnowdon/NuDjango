//  Below creates localStorage for Saving/Loading

window.localStorage;

$(document).ready(function() {

    // Player Object

    var player = new Object();
    player.maxHp = 100;
    player.currentHp = 100;
    player.power = 10;
    player.speed = 20;

    // Enemy Object

    var enemy = new Object();
    enemy.name = "Steve";
    enemy.maxHp = 100;
    enemy.currentHp = 100;
    enemy.power = 10;

    // Setup Functions

    function setPlayerStats(x) {
        $("#playerName").text(player.name);
        player.currentHp = x;
        player.maxHp = x;
        $("#playerHealth").text(player.currentHp);
        $("#playerMaxHp").text(player.maxHp)
    }

    function emptyResults() {
        $("#winnerResult").empty();
        $("#playerHitResult").empty();
        $("#enemyHitResult").empty();
    }

    // Combat Functions

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

    function startCombat() {
        emptyResults()
        $("#hitresults").show();
        $(".buttons").fadeOut("slow");
        $("#enemyName").text(enemy.name);
        $("#enemyHealth").text(enemy.currentHp);
        $("#enemyMaxHp").text(enemy.maxHp);
        setTimeout(function() {
            $(".combat").fadeIn("slow");
        }, 1000);
        $("#attackButton").attr("disabled", false);
    }

    function doesAttackHit(a, d) {
        let aSpeed = (getDiceRoll(a.speed) + a.speed)
        let dSpeed = (getDiceRoll(d.speed) + getDiceRoll(d.speed))
        console.log(aSpeed, dSpeed)
        if (aSpeed >= dSpeed) {
            return true;
        } else {
            return false;
        }
    }

    function playerAttack() {
        // Empties Crit and disables attack button

        $("#attackButton").attr("disabled", true);
        $("#enemyCrit").empty()

        // Check To Hit

        if (doesAttackHit(player, enemy)) {

            // Check for Crit

            if (getDiceRoll(100) > 80) {
                $("#playerCrit").show().text("Crit!").css("color", "red");
                attackDmg = basicAttack(enemy.power) * 5;
            } else {
                attackDmg = basicAttack(enemy.power);
            }

            // Reduces enemy health and displays results

            enemy.currentHp -= attackDmg;
            $("#playerHitResult").html(player.name + " Hit The Enemy for " + attackDmg + " Hit Points!");
            $("#enemyHealth").html(enemy.currentHp);
        } else {
            $("#playerHitResult").html(player.name + " Misses " + enemy.name);
        }
    }

    function enemyAttack() {
        $("#playerCrit").empty()
        if (doesAttackHit(enemy, player)) {
            if (getDiceRoll(100) > 80) {
                $("#enemyCrit").show().text("Crit!").css("color", "red");
                eAttackDmg = basicAttack(enemy.power) * 5;
            } else {
                eAttackDmg = basicAttack(enemy.power);
            }
            player.currentHp -= eAttackDmg;
            $("#enemyHitResult").html(enemy.name + " Hit " + player.name + " for " + eAttackDmg + " Hit Points!");
            $("#playerHealth").text(player.currentHp);
        } else {
            $("#enemyHitResult").html(enemy.name + " Misses " + player.name);
        }
        $("#attackButton").attr("disabled", false);
    }

    // Endgame checker

    function areYouDead(hp) {
        return hp <= 0;
    }

    // Restart 

    function resetStats() {
        player.currentHp = player.maxHp;
        $("#hitresults").fadeOut("slow");
        $("#enemyHealth").html(enemy.maxHp);
        $("#playerHealth").html(player.currentHp);
        $(".combat").fadeOut("slow");
        $("#enemyCrit").empty()
        $("#playerCrit").empty()
        setTimeout(function() {
            $(".buttons").fadeIn("slow");
        }, 1500)
    }

    // Gameplay Flow

    $("#name-sumbit").click(function() {
        // Checks name has value (Trimmed in case of whitespace)
        var playerName = $("#player-name").val();
        $(".name").fadeOut("slow");
        if ($.trim(playerName) == '') {
            alert('You surely must have a name!');
            $(".name").fadeIn("slow");
        } else {
            player.name = playerName;
        }
        if (typeof player.name !== "undefined") {
            setPlayerStats(100);
            setTimeout(function() {
                $(".buttons").fadeIn("slow");
                $(".stat-nav").fadeIn("slow");
            }, 1000);
        }
    });

    $("#startEasy").click(function() {
        enemy.name = "Easy";
        enemy.maxHp = 100;
        enemy.currentHp = enemy.maxHp;
        enemy.speed = 15;
        startCombat();
    })

    $("#startMedium").click(function() {
        enemy.name = "Medium";
        enemy.maxHp = 125;
        enemy.currentHp = enemy.maxHp;
        enemy.speed = 20;
        startCombat();
    })

    $("#startHard").click(function() {
        enemy.name = "Hard";
        enemy.maxHp = 150;
        enemy.currentHp = enemy.maxHp;
        enemy.speed = 25;
        startCombat();
    })

    // Player Attack

    $("#attackButton").click(function() {
        playerAttack();
        // Checks if enemy HP is below 0 and ends combat
        if (areYouDead(enemy.currentHp)) {
            $("#enemyHealth").html(0);
            $("#winnerResult").html(player.name + " Wins!");
            setTimeout(function() {
                resetStats();
            }, 1500);
            return;
        }

        // Enemy Attack

        setTimeout(function() {
            enemyAttack();
            if (areYouDead(player.currentHp)) {
                $("#attackButton").attr("disabled", true);
                $("#playerHealth").html(0);
                $("#winnerResult").html(enemy.name + " Wins!");
                setTimeout(function() {
                    resetStats()
                }, 1500)
                return;
            }
        }, 1000);
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