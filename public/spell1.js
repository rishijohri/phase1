$(function(){
    //make connection
 //var socket = io.connect('http://localhost:3000')
 var host = window.location.host; // Get the host name here
 var socket = io.connect('http://' + host);

 //buttons and inputs
 var you_spell = $("#you-spell")
 var opp_spell = $("#opp-spell")
 var you_health = $("#you")
 var opp_health = $("#opponent")
 var username = $("#username")
 var key = $("#key")
 var enyou = $("#enyou")
 var enop = $("#enop")
 var spell_form  =$("#spell-cast-form")
 var castspell = $("#spell-cast")
 var magic_wand = $("#magic-wand")
 var youstats = $("#youstats")
 var oppstats = $("#oppstats") 
 
 $(document).keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		socket.emit('new_message', {spell : castspell.val(), 
                                    key: key[0].innerText, 
                                    user : "one",
                                    energy: Number(enyou[0].innerText),
                                    opphealth: Number(opp_health[0].innerText),
                                    youhealth: Number(you_health[0].innerText),
                                    youstats: youstats.html(),
                                    oppstats : oppstats.html()
        })
	}
	
});
 //Emit message
 magic_wand.click(function(){
     socket.emit('new_message', {spell : castspell.val(), 
                                key: key[0].innerText, 
                                user : "one",
                                energy: Number(enyou[0].innerText),
                                opphealth: Number(opp_health[0].innerText),
                                youhealth: Number(you_health[0].innerText),
                                youstats: youstats.html(),
                                oppstats : oppstats.html()
                            })
 })

 //Listen on new_message
 socket.on("new_message", (data) => {
    if(data.key===key[0].innerText) {
        if (data.user === "one") {
           castspell.val('')
           you_spell.html("<h1 class='ui header' style='text-align: center'>"+data.spell+"</h1>")
           var yokhealth = Number(you_health[0].innerText) + data.hlth
           var yokenergy = Number(enyou.html())-data.enrgy
           var yokdamage = Number(opp_health[0].innerText) - data.dmg
           if (data.defadd) {
               youstats.html(data.defadd)
               setTimeout(function() {
                youstats.html(" ,* ")
            }, 10000)
           }
           if (data.defrem) {
               oppstats.html(data.defrem)
           }
           opp_health.html(yokdamage)
           enyou.html(yokenergy)
           you_health.html(yokhealth)
           defeatcheck(yokhealth, yokdamage)
        } else if (data.user === "two") {
            castspell.val('')
            opp_spell.html("<h1 class='ui header' style='text-align: center'>"+data.spell+"</h1>")
            var yokhealth = Number(opp_health[0].innerText) + data.hlth
            opp_health.html(yokhealth)
            var yokenergy = Number(enop.html())-data.enrgy
            enop.html(yokenergy)
            var yokdamage = Number(you_health[0].innerText) - data.dmg
            you_health.html(yokdamage)
            if (data.defadd) {
            oppstats.html(data.defadd)
            setTimeout(function() {
                oppstats.html(" ,* ")
            }, 10000)
            }
            if (data.defrem) {
            youstats.html(data.defrem)
            }
            defeatcheck(yokdamage, yokhealth)
            }   
        }
        console.log("client emitted")
 })

});
function defeatcheck(yo, op) {
    if (yo<=0) {
        alert("user one is defeated")
    } else if (op<=0) {
        alert("user two is defeated")
    }
}

if (data.caster ==='one') {
    if (gameState.playerone.x<gameState.playertwo.x) {
        var velfire = 500
        var velwater = 600 
    } else {
        var velfire = -500
        var velwater = -600
    }
    if (data.spell==='fire') {
        gameState.playerone.play('attack')
                    fire.create(gameState.playerone.x+100,gameState.playerone.y, 'fire-0').setScale(0.5)
                    fire.setVelocityX(velfire)
                    fire.playAnimation('fireball')
                    this.time.addEvent({
                        delay : 1000,
                        callback : () => {
                            fire.getChildren().map(child => {
                                child.destroy()
                                console.log('destroyed')
                            })
                        },
                        callbackScope: this,
                        loop : false
                    })
    } else if (data.spell==='water') {
        gameState.playerone.play('attack')
                    water.create(gameState.playerone.x+100,gameState.playerone.y, 'water-0').setScale(0.5)
                    water.setVelocityX(velwater)
                    water.playAnimation('waterball')
                    this.time.addEvent({
                        delay : 1500,
                        callback : () => {
                            water.getChildren().map(child => {
                                child.destroy()
                                console.log('destroyed')
                            })
                        },
                        callbackScope: this,
                        loop : false
                    })
    }
} else if (data.caster==='two') {
    if (gameState.playerone.x>gameState.playertwo.x) {
        var velfire = 500
        var velwater = 600 
    } else {
        var velfire = -500
        var velwater = -600
    }
    if (data.spell==='fire') {
        gameState.playertwo.play('attack')
                    fire.create(gameState.playertwo.x-100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                    fire.setVelocityX(-500)
                    fire.playAnimation('fireball')
                    fire.getChildren().forEach(child => {
                        child.flipX = true
                    })
                    this.time.addEvent({
                        delay : 1000,
                        callback : () => {
                            fire.getChildren().map(child => {
                                child.destroy()
                                console.log('destroyed')
                            })
                        },
                        callbackScope: this,
                        loop : false
                    })
    } else if (data.spell==='water') {
        gameState.playertwo.play('attack')
                        water.create(gameState.playertwo.x-100,gameState.playertwo.y, 'water-0').setScale(0.5)
                        water.setVelocityX(-600)
                        water.playAnimation('waterball')
                        water.getChildren().forEach(child => {
                            child.flipX = true
                        })
                        this.time.addEvent({
                            delay : 1500,
                            callback : () => {
                                water.getChildren().map(child => {
                                    child.destroy()
                                    console.log('destroyed')
                                })
                            },
                            callbackScope: this,
                            loop : false
                        })
    }
}

