//  Below creates localStorage for Saving/Loading

window.localStorage;

$(document).ready(function() {

    // Player Object

    var player = new Object();
    player.maxHp = 100;
    player.power = 10;

    // Helper Functions

    // getDieRoll takes amount of "sides" as a parameter

    function getDiceRoll(x) {
        return Math.floor(Math.random() * x) + 1;
    }

    function attack(base, power) {
        return base + power;
    }

    // Checker for endgame

    function areYouDead(hp) {
        return hp <= 0;
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
            $("#startCombat").fadeIn("slow");
            $("#savedName").text(player.name);
        }
    });

    $("#startCombat").click(function() {
        $(".name").fadeOut("slow");
        setTimeout(function() {
            $(".combat").fadeIn("slow");
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