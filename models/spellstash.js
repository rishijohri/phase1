module.exports = {
    test: function (hi) {
        console.log("module is working fine "+hi)
    },
    findelement: function (spell) {
        var brick = spell.split(" ")
        var elemindex = brick.find(function(elem) {
            var types = ["fire","water","earth","wind", "lightning", "ice", "steam", "wood", "metal", "poison", "air", "mud"]
            return types.indexOf(elem) !=(-1)
        })
        
        return elemindex
    },
    findnature: function(spell) {
        var brick = spell.split(" ")
        var natindex = brick.find(function(nat) {
            return (nat ==="attack"||nat ==="defence"||nat==="heal")
        })
        return natindex
    },
    attacknature: function(spell) {
        var brick = spell.split(" ")
        var types = ["ball", "strike", "blast", "pulse", "bind", "ram", "blade", "bite", "claw", "hit", "shot"]
        var atnature = brick.find(function(attnat) {
            return types.indexOf(attnat) != (-1)
        })
        return atnature
    },
    fundattnat: function(attacknature) {
        var types = ["heavy", "piercing", "melee"]
        if (attacknature ==="ball" || attacknature ==="hit" || attacknature ==="pulse") {
            return types[2]
        } else if (attacknature ==="strike" || attacknature ==="blast" || attacknature ==="ram") {
            return types[0]
        } else if (attacknature ==="bind" || attacknature ==="blade" || attacknature ==="bite"||attacknature==="claw") {
            return types[1]
        }
    },
    damagecount: function(elem, att) {    // speed shapeshift phy.strength impact density pressure
        var ball =  ["ball", 0, 4, 2, 3, -1, 5]
        var strike = ["strike", 5, 2, 2, 4, 1, 2]
        var blast = ["blast", 3, 0, -1, 5, 2, 4]
        var pulse = ["pulse", 4, 5, 2, 3, 1, 3]
        var bind =  ["bind", 1, 3, 5, 2, 4, 2]
        var ram =   ["ram", 1, 0, 4, 3, 5, 1]
        var blade = ["blade", 5, 4, 3, 2, -1, 0]
        var claw =  ["claw", 4, 5, 3, 1, 1, 0]
        var hit =   ["hit", 3, 2, 3, 3, 2, 0]
        var shot = ["shot", 4, 3, 2, 3, 1, 4]
        var attlist = [ball, strike, blast, pulse, bind, ram, blade, claw, hit, shot]
        var fire = ["fire", 4, 3, 0, 5, 0, 4]
        var water = ["water",4, 4, 1, 2, 1, 5]
        var earth = ["earth", 1, 1, 5, 3, 5, 1]
        var wind = ["wind", 5, 5, 0, 3, 0, 4]
        var steam = ["steam", 4, 1, 3, 4, 0, 4]
        var wood = ["wood", 1, 4, 4, 3, 3, 2]
        var metal = ["metal", 2, 3, 4, 3, 3, 2]
        var lightning = ["lightning", 5, 3, 2, 5, 0, 2]
        var poison = ["poison", 2, 5, 0, 5, 1, 4]
        var ice = ["ice", 4, 3, 3, 3, 2, 1]
        var air = ["air", 5, 5, 0, 3, 0, 4]
        var mud = ["mud", 1, 1, 5, 3, 5, 1]
        var elemlist = [fire, water, earth, wind, steam, wood, metal, lightning, poison, ice, air, mud]
        var elemindex;
        for (var i=0; i<=9; i++) {
            if (elem === elemlist[i][0]) {
                elemindex = i
                break;
            }
        }
        var attindex;
        for (var i=0; i<=8; i++) {
            if (att === attlist[i][0]) {
                attindex = i
                break;
            }
        }
        var damage = 0;
        for (var i=1; i<=6; i++) {
            damage += elemlist[elemindex][i]*attlist[attindex][i]
        }
        return damage
    },
    defencenature: function (spell) {  // splits def spell with " " so beware of using
        var brick = spell.split(" ")
        var types = ["wall", "bending", "mirage", "prison", "sphere", "shield"]
        var defnature = brick.find(function(defnat) {
            return types.indexOf(defnat) != (-1)
        })
        return defnature
    },
    funddefnature: function(defnat) {
        if (defnat==="wall" || defnat ==="prison" || defnat ==="sphere"|| defnat ==="shield") {
            return "defence"
        } else if (defnat ==="bending" || defnat ==="mirage") {
            return "counter"
        }
    },
    defencecount: function(elem, def) {  //splits the def spell with " " so beware of using it
        var fire = ["fire", 4, 3, 0, 5, 0, 4]
        var water = ["water",4, 4, 1, 2, 1, 5]
        var earth = ["earth", 1, 1, 5, 3, 5, 1]
        var wind = ["wind", 5, 5, 0, 3, 0, 4]
        var steam = ["steam", 4, 1, 3, 4, 0, 4]
        var wood = ["wood", 1, 4, 4, 3, 3, 2]
        var metal = ["metal", 2, 3, 4, 3, 3, 2]
        var lightning = ["lightning", 5, 3, 2, 5, 0, 2]
        var poison = ["poison", 2, 5, 0, 5, 1, 4]
        var ice = ["ice", 4, 3, 3, 3, 2, 1]
        var elemlist = [fire, water, earth, wind, steam, wood, metal, lightning, poison, ice]
        var elemindex;
        for (var i=0; i<=9; i++) {
            if (elem === elemlist[i][0]) {
                elemindex = i
                break;
            }
        }
        var wall = ["wall", 0, 3, 5, 2, 5, 1]
        var bending = ["bending", 3, 4, 2, 3, 4, 1]
        var mirage = ["mirage", 5, 5, 0, 2, 3, 1]
        var prison = ["prison", 0, 4, 5, 4, 5, 0]
        var sphere = ["sphere", 4, 5, 1, 2, 2, 3]
        var shield = ["shield", 2, 4, 5, 3, 4, 0]
        var deflist = [wall, bending, mirage, prison, sphere, shield]
        var defindex;
        for (var i=0; i<=5; i++) {
            if (def === deflist[i][0]) {
                defindex = i
                break;
            }
        }
        var defence = 0;
        for (var i=1; i<=6; i++) {
            defence += elemlist[elemindex][i]*deflist[defindex][i]
        }
        return defence
    },
    defencerelease: function (spell) {      //splits the defence spell with "-"
          function tempone(spell) {
            var brick = spell.split("-")
            var elemindex = brick.find(function(elem) {
                var types = ["fire","water","earth","wind", "lightning", "ice", "steam", "wood", "metal", "poison"]
                return types.indexOf(elem) !=(-1)
            })
            
            return elemindex
        }
        var elem = tempone(spell)
        function temptwo(spell) {
            var brick = spell.split("-")
            var types = ["wall", "bending", "mirage", "prison", "sphere", "shield"]
            var defnature = brick.find(function(defnat) {
                return types.indexOf(defnat) != (-1)
            })
            return defnature
        }
        if (spell.split("-").length ===1) {
            return 0
        }
        var def = temptwo(spell)
        var fire = ["fire", 4, 3, 0, 5, 0, 4]
        var water = ["water",4, 4, 1, 2, 1, 5]
        var earth = ["earth", 1, 1, 5, 3, 5, 1]
        var wind = ["wind", 5, 5, 0, 3, 0, 4]
        var steam = ["steam", 4, 1, 3, 4, 0, 4]
        var wood = ["wood", 1, 4, 4, 3, 3, 2]
        var metal = ["metal", 2, 3, 4, 3, 3, 2]
        var lightning = ["lightning", 5, 3, 2, 5, 0, 2]
        var poison = ["poison", 2, 5, 0, 5, 1, 4]
        var ice = ["ice", 4, 3, 3, 3, 2, 1]
        var elemlist = [fire, water, earth, wind, steam, wood, metal, lightning, poison, ice]
        var elemindex;
        for (var i=0; i<=9; i++) {
            if (elem === elemlist[i][0]) {
                elemindex = i
                break;
            }
            elemindex= -1
        }
        var wall = ["wall", 0, 3, 5, 2, 5, 1]
        var bending = ["bending", 3, 4, 2, 3, 4, 1]
        var mirage = ["mirage", 5, 5, 0, 2, 3, 1]
        var prison = ["prison", 0, 4, 5, 4, 5, 0]
        var sphere = ["sphere", 4, 5, 1, 2, 2, 3]
        var shield = ["shield", 2, 4, 5, 3, 4, 0]
        var deflist = [wall, bending, mirage, prison, sphere, shield]
        var defindex;
        for (var i=0; i<=5; i++) {
            if (def === deflist[i][0]) {
                defindex = i
                break;
            }
            defindex = -1
        }
        
        var defence = 0;
        if (elemindex != -1 || defindex != -1) {
        for (var i=1; i<=6; i++) {
            defence += elemlist[elemindex][i]*deflist[defindex][i]
        }
        return defence 
    } else {
        return 0
    }
    },
    defenceselect: function(attelem, spell) {  //splits def with "-"
        function tempone(spell) {
            if (!spell) {
                return "unknown"
            }
            var brick = spell.split("-")
            var elemindex = brick.find(function(elem) {
                var types = ["fire","water","earth","wind", "lightning", "ice", "steam", "wood", "metal", "poison"]
                return types.indexOf(elem) !=(-1)
            })
            
            return elemindex
        }
        var elem = tempone(spell)
        if (attelem ===elem) {
            return true
        } else {
            return false
        }

    },
    

}