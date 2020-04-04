$(function(){
    //make connection
 var socket = io.connect('http://localhost:3000')

 //buttons and inputs
 var you_spell = $("#you-spell")
 var opp_spell = $("#opp-spell")
 var you_health = $("#you")
 var opp_health = $("#opponent")
 var username = $("#username")
 var key = $("#key")
 var send_message = $("#send_message")
 var spell_form  =$("#spell-cast-form")
 var castspell = $("#spell-cast")
 var magic_wand = $("#magic-wand") 
 //var chatroom = $("#chatroom")

 //Emit message
 magic_wand.click(function(){
     socket.emit('new_message', {spell : castspell.val(), key: key[0].innerText, user : "one"})
 })

 //Listen on new_message
 socket.on("new_message", (data) => {
    if(data.key===key[0].innerText) {
        if (data.user === "one") {
           castspell.val('')
           you_spell.html("<h1 class='ui header'>"+data.spell+"</h1>")
        } else if (data.user === "two") {
            castspell.val('')
            opp_spell.html("<h1 class='ui header'>"+data.spell+"</h1>")
        }
        }
        console.log("client emitted")
 })

});