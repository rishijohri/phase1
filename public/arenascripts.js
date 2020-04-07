$(function() {
    var host = window.location.host; // Get the host name here
 var socket = io.connect('https://' + host);
var config = {
    width : 1535,
    height : 590,
    backgroundColor : '#87ceeb',
    physics : {
        default : 'arcade',
        arcade : {
          gravity : { y : 0 },
          enableBody : true,
        }
    },
    scene : {
        preload,
        create,
        update
    }
}
var key = $("#key")
var pone = $("#pone")
var eone = $("#eone")
var ptwo = $("#ptwo")
var etwo = $("#etwo")
var nature = $('#nature')
var nameone = $('#name1').html()
var nametwo = $('#name2').html()
var natural = nature.html()
var keyval = key[0].innerText
var timer = 0
var time = 0
var castspell = $('#spell-cast')
var game = new Phaser.Game(config)
var gameState = {}
var dmgCount = 0;
gameState.onevel = 160
gameState.twovel = 160
gameState.onerecov = 300
gameState.tworecov = 300
onevelmult = 1
twovelmult = 1
function preload() {
    this.load.image('background', '/assets/backgroundtwo.jpg')
    this.load.atlas('slime', '/assets/finalpic.png', '/assets/finaldata.json')
    this.load.image('dragon-0', '/assets/dragons/dragon-0.png')
    this.load.image('dragon-1', '/assets/dragons/dragon-1.png')
    this.load.image('dragon-2', '/assets/dragons/dragon-2.png')
    this.load.image('dragon-3', '/assets/dragons/dragon-3.png')
    this.load.image('dragon-4', '/assets/dragons/dragon-4.png')
    this.load.image('dragon-5', '/assets/dragons/dragon-5.png')
    this.load.image('dragon-6', '/assets/dragons/dragon-6.png')
    this.load.image('dragon-7', '/assets/dragons/dragon-7.png')
    this.load.image('dragon-8', '/assets/dragons/dragon-8.png')
    this.load.image('dragon-9', '/assets/dragons/dragon-9.png')
    this.load.image('dragon-10', '/assets/dragons/dragon-10.png')
    this.load.image('dragon-11', '/assets/dragons/dragon-11.png')
    this.load.image('fire-0', '/assets/firestor/firesup-0.png')
    this.load.image('fire-1', '/assets/firestor/firesup-1.png')
    this.load.image('fire-2', '/assets/firestor/firesup-2.png')
    this.load.image('fire-3', '/assets/firestor/firesup-3.png')
    this.load.image('fire-4', '/assets/firestor/firesup-4.png')
    this.load.image('fire-5', '/assets/firestor/firesup-5.png')
    this.load.image('vertical', '/assets/vert.jpg')
    this.load.image('water-0', '/assets/waterstor/supwater-0.png')
    this.load.image('water-1', '/assets/waterstor/supwater-1.png')
    this.load.image('water-2', '/assets/waterstor/supwater-2.png')
    this.load.image('water-3', '/assets/waterstor/supwater-3.png')
    this.load.image('poison-0', '/assets/pois/Picture1.png')
    this.load.image('poison-1', '/assets/pois/Picture2.png')
    this.load.image('poison-2', '/assets/pois/Picture3.png')
}
$(document).keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13') {
        socket.emit('spellcast', {spell : castspell.val(), user : natural, key: keyval, onepos: gameState.playerone.x, twopos: gameState.playertwo.x})
        castspell.val('')
    } 
    
}
)
function create() {
    gameState.active = true
    gameState.background = this.add.image(767, 350, 'background')
    gameState.playerone = this.physics.add.sprite(200, 200, 'dragon-3').setScale(0.7)
    gameState.playerone.setCollideWorldBounds(true);
    gameState.playertwo = this.physics.add.sprite(1000, 300, 'dragon-9').setScale(0.7)
    gameState.playertwo.setCollideWorldBounds(true);
    gameState.playertwo.tint = 0xa0fa05
    this.anims.create({ key: 'up',
        frames: [
            { key: 'dragon-0' },
            { key: 'dragon-1' },
            { key: 'dragon-2', duration: 50 }
        ],
        frameRate: 11,
        repeat: -1
    });
    this.anims.create({ key: 'right',
        frames: [
            { key: 'dragon-3' },
            { key: 'dragon-4' },
            { key: 'dragon-5', duration: 50 },
        ],
        frameRate: 11,
        repeat: -1
    });
    this.anims.create({ key: 'down',
        frames: [
            { key: 'dragon-6' },
            { key: 'dragon-7' },
            { key: 'dragon-8', duration: 50 }
        ],
        frameRate: 11,
        repeat: -1
    });
    this.anims.create({ key: 'left',
        frames: [
            { key: 'dragon-9' },
            { key: 'dragon-10' },
            { key: 'dragon-11', duration: 50 }
        ],
        frameRate: 11,
        repeat: -1
    });
    this.anims.create({ key: 'fireball',
        frames: [
            { key: 'fire-0' },
            { key: 'fire-1' },
            { key: 'fire-2' },
            { key: 'fire-3' },
            { key: 'fire-4' },
            { key: 'fire-5', duration: 50 }
        ],
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({ key : 'waterball',
        frames : [
            { key : 'water-0'},
            { key : 'water-1' },
            { key : 'water-2' },
            { key : 'water-3', duration: 50 }
        ],
        frameRate: 13,
        repeat: -1
    })
    this.anims.create({ key : 'poison',
        frames : [
            {key : 'poison-0'},
            {key : 'poison-1'},
            {key : 'poison-2', duration : 50}
        ],
        frameRate : 11,
        repeat:  -1
    })
    gameState.playerone.play('right')
    gameState.playertwo.play('left')
    gameState.right = this.input.keyboard.addKey('RIGHT')
    gameState.up = this.input.keyboard.addKey('UP')
    gameState.left = this.input.keyboard.addKey('LEFT')
    gameState.down = this.input.keyboard.addKey('DOWN')
    gameState.m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    gameState.v = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
    this.time.addEvent({
        delay : 1850,
        callback : () => {
            timer++
        },
        callbackScope : this,
        loop : true
    })
    this.time.addEvent({
        delay : 1850,
        callback : () => {
            time++
        },
        callbackScope : this,
        loop : true
    })
    this.time.addEvent({
        delay : 2000,
        callback : () => {
            dmgCount++
        },
        callbackScope : this,
        loop : true
    })
    this.time.addEvent({
        delay : 100,
        callback : () => {
            if (pone.html()<=0) {
                alert(nameone+' is defeated and '+nametwo+' is the winner')
                window.location ='https://' + host+ '/'
            } else if (ptwo.html()<=0) {
                alert(nametwo+' is defeated and '+nameone+' is the winner')
                window.location ='https://' + host+ '/'
            }
        },
        callbackScope : this,
        loop : true
    })
    this.time.addEvent({
        delay : gameState.onerecov,
        callback : () => {
            if (eone.html()<300) {
                eone.html(Number(eone.html()) + 1)
            } else {
                eone.html(300)
            }
            }
        ,
        callbackScope : this,
        loop : true
    })
    this.time.addEvent({
        delay : gameState.tworecov,
        callback : () => {
            if (etwo.html()<300) {
                etwo.html(Number(etwo.html()) + 1)
            } else {
                etwo.html(300)
            }
            }
        ,
        callbackScope : this,
        loop : true
    })
}


function update() {
    var fire = this.physics.add.group()
    var water = this.physics.add.group()
    var dark = this.physics.add.group()
    var poison = this.physics.add.group()
    // this sends request to move to the backend server
        if (Phaser.Input.Keyboard.JustDown(gameState.right)) {
            socket.emit('new-move', {
                move : 'right',
                user : natural
            })
        } else if (Phaser.Input.Keyboard.JustDown(gameState.left)) {
            socket.emit('new-move', {
                move : 'left',
                user : natural
            })
        } else if (Phaser.Input.Keyboard.JustDown(gameState.up)) {
            socket.emit('new-move', {
                move : 'up',
                user : natural
            })
        } else if (Phaser.Input.Keyboard.JustDown(gameState.down)) {
            socket.emit('new-move', {
                move : 'down',
                user : natural
            })
        } else if (gameState.m.isDown) {
            gameState.playerone.anims.play('defend', true)
        }
        //this is for global broadcast of movements
        socket.on('new-move', (data) => { 
            if (data.user==='one') {
                if (data.move === "right") {
                    gameState.playerone.setVelocityX(gameState.onevel*onevelmult)
                    gameState.playerone.setVelocityY(0)
                    gameState.playerone.anims.play('right', true);
                  } else if (data.move === 'left') {
                    gameState.playerone.setVelocityX(-gameState.onevel*onevelmult)
                    gameState.playerone.setVelocityY(0)
                    gameState.playerone.anims.play('left', true);
                  } else if (data.move === 'down') {
                      gameState.playerone.setVelocityY(gameState.onevel*onevelmult)
                      gameState.playerone.setVelocityX(0)
                      gameState.playerone.anims.play('down', true);
                  } else if (data.move === 'up') {
                    gameState.playerone.setVelocityY(-gameState.onevel*onevelmult)
                    gameState.playerone.setVelocityX(0)
                    gameState.playerone.anims.play('up', true);
                }
        } else if (data.user==='two') {
            if (data.move === "right") {
                gameState.playertwo.setVelocityX(gameState.twovel*twovelmult)
                gameState.playertwo.setVelocityY(0)
                gameState.playertwo.anims.play('right', true);
              } else if (data.move === 'left') {
                gameState.playertwo.setVelocityX(-gameState.twovel*twovelmult)
                gameState.playertwo.setVelocityY(0)
                gameState.playertwo.anims.play('left', true);
              } else if (data.move === 'down') {
                  gameState.playertwo.setVelocityY(gameState.twovel*twovelmult)
                  gameState.playertwo.setVelocityX(0)
                  gameState.playertwo.anims.play('down', true);
              } else if (data.move === 'up') {
                gameState.playertwo.setVelocityY(-gameState.twovel*twovelmult)
                gameState.playertwo.setVelocityX(0)
                gameState.playertwo.anims.play('up', true);
            }
        } 
          })
          socket.on('spellcast', (data) => {
            if (timer > 1) {
                timer = 0
                if (data.caster ==='one') {
                    if (data.cost<=Number(eone.html())) {
                        eone.html(Number(eone.html())-data.cost)
                    gameState.playerone.setVelocity(0)
                    if (data.spell==='fire ball') {
                                if (data.vel>0) {
                                    gameState.playerone.play('right')
                                    fire.create(gameState.playerone.x+100,gameState.playerone.y, 'fire-0').setScale(0.5)
                                } else {
                                    gameState.playerone.play('left')
                                    fire.create(gameState.playerone.x-100,gameState.playerone.y, 'fire-0').setScale(0.5)
                                    fire.getChildren().forEach(child => {
                                        child.flipX = true
                                    })
                                }
                                    fire.setVelocityX(data.vel)
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
                    } else if (data.spell==='water ball') {
                                if (data.vel>0) {
                                    gameState.playerone.play('right')
                                    water.create(gameState.playerone.x+100,gameState.playerone.y, 'water-0').setScale(0.5)
                                } else {
                                    gameState.playerone.play('left')
                                    water.create(gameState.playerone.x-100,gameState.playerone.y, 'water-0').setScale(0.5)
                                    water.getChildren().forEach(child => {
                                        child.flipX = true
                                    })
                                }
                                    water.setVelocityX(data.vel)
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
                    } else if (data.spell ==='boost') {
                        onevelmult = 2
                        this.time.addEvent({
                            delay : 8000,
                            callback : () => {
                                onevelmult = 1
                            },
                            callbackScope : this,
                            loop : false
                        })
                    } else if (data.spell ==='dark ball') {
                        if (data.vel>0) {
                            gameState.playerone.play('right')
                            dark.create(gameState.playerone.x+100,gameState.playerone.y, 'fire-0').setScale(0.5)
                            
                        } else {
                            gameState.playerone.play('left')
                            dark.create(gameState.playerone.x-100,gameState.playerone.y, 'fire-0').setScale(0.5)
                            dark.getChildren().forEach(child => {
                                child.flipX = true
                            })
                        }
                        dark.getChildren().forEach(child => {
                            child.tint = 0x2f2f30
                        })
                        dark.setVelocityX(data.vel)
                                    dark.playAnimation('fireball')
                                    this.time.addEvent({
                                        delay : 1000,
                                        callback : () => {
                                            dark.getChildren().map(child => {
                                                child.destroy()
                                                console.log('destroyed')
                                            })
                                        },
                                        callbackScope: this,
                                        loop : false
                                    })
                    } else if (data.spell === 'poison gas') {
                        if (data.vel>0) {
                            gameState.playerone.play('right')
                            poison.create(gameState.playerone.x+200,gameState.playerone.y, 'poison-0').setScale(0.7)
                        } else {
                            gameState.playerone.play('left')
                            poison.create(gameState.playerone.x-200,gameState.playerone.y, 'poison-0').setScale(0.7)
                        }
                            poison.playAnimation('poison')
                            this.time.addEvent({
                                delay : 10000,
                                callback : () => {
                                    poison.getChildren().map(child => {
                                        child.destroy()
                                        console.log('destroyed')
                                    })
                                },
                                callbackScope: this,
                                loop : false
                            })
                    }
                }
             } else if (data.caster==='two') {
                 if (data.cost <= Number(etwo.html())) {
                     etwo.html(Number(etwo.html())-data.cost)
                    gameState.playertwo.setVelocity(0)
                    if (data.spell==='fire ball') {
                            if (data.vel>0) {
                                gameState.playertwo.play('right')
                                fire.create(gameState.playertwo.x+100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                            } else {
                                gameState.playertwo.play('left')
                                fire.create(gameState.playertwo.x-100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                                fire.getChildren().forEach(child => {
                                    child.flipX = true
                                })
                            }
                                    fire.setVelocityX(data.vel)
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
                    } else if (data.spell==='water ball') {
                            if (data.vel>0) {
                                gameState.playertwo.play('right')
                                water.create(gameState.playertwo.x+100,gameState.playertwo.y, 'water-0').setScale(0.5)
                            } else {
                                gameState.playertwo.play('left')
                                water.create(gameState.playertwo.x-100,gameState.playertwo.y, 'water-0').setScale(0.5)
                                water.getChildren().forEach(child => {
                                    child.flipX = true
                                })
                            }                                    
                                        water.setVelocityX(data.vel)
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
                    } else if (data.spell ==='boost') {
                        twovelmult = 2
                        this.time.addEvent({
                            delay : 8000,
                            callback : () => {
                                twovelmult = 1
                            },
                            callbackScope : this,
                            loop : false
                        })
                    } else if (data.spell ==='dark ball') {
                        if (data.vel>0) {
                            gameState.playertwo.play('right')
                            dark.create(gameState.playertwo.x+100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                        } else {
                            gameState.playertwo.play('left')
                            dark.create(gameState.playertwo.x-100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                            dark.getChildren().forEach(child => {
                                child.flipX = true
                            })
                        }
                        dark.getChildren().forEach(child => {
                            child.tint = 0x2f2f30
                        })
                                dark.setVelocityX(data.vel)
                                dark.playAnimation('fireball')
        
                                this.time.addEvent({
                                    delay : 1000,
                                    callback : () => {
                                        dark.getChildren().map(child => {
                                            child.destroy()
                                            console.log('destroyed')
                                        })
                                    },
                                    callbackScope: this,
                                    loop : false
                                })
                    } else if (data.spell ==='poison gas') {
                        if (data.vel>0) {
                            gameState.playertwo.play('right')
                            poison.create(gameState.playertwo.x+200,gameState.playertwo.y, 'poison-0').setScale(0.7)
                        } else {
                            gameState.playertwo.play('left')
                            poison.create(gameState.playertwo.x-200,gameState.playertwo.y, 'poison-0').setScale(0.7)
                        }
                            poison.playAnimation('poison')
                            this.time.addEvent({
                                delay : 10000,
                                callback : () => {
                                    poison.getChildren().map(child => {
                                        child.destroy()
                                        console.log('destroyed')
                                    })
                                },
                                callbackScope: this,
                                loop : false
                            })
                    }
                }
                }
            }

        })
    
    this.physics.add.overlap(fire, gameState.playerone, (ball, player) => {
        fire.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'one',
                key : keyval,
                affect : 'one',
                type : 'fire',
                shield : false
            })
        
    })
    this.physics.add.overlap(fire, gameState.playertwo, (ball, player) => {
        fire.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'two',
                key : keyval,
                affect : 'two',
                type : 'fire',
                shield : false
            })
        
    })
    this.physics.add.overlap(water, gameState.playertwo, (ball, player) => {
        water.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'two',
                key : keyval,
                affect : 'two',
                type : 'water',
                shield : false
            })
        
    })
    this.physics.add.overlap(water, gameState.playerone, (ball, player) => {
        water.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'one',
                key : keyval,
                affect : 'one',
                type : 'water',
                shield : false
            })
        
    })
    this.physics.add.overlap(dark, gameState.playerone, (ball, player) => {
        dark.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'one',
                key : keyval,
                affect : 'one',
                type : 'dark',
                shield : false
            })
        
    })
    this.physics.add.overlap(dark, gameState.playertwo, (ball, player) => {
        dark.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'two',
                key : keyval,
                affect : 'two',
                type : 'dark',
                shield : false
            })
        
    })
    this.physics.add.overlap(poison, gameState.playertwo, (ball, player) => {
        poison.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'two',
                key : keyval,
                affect : 'two',
                type : 'poison',
                shield : false
            })
        
    })
    this.physics.add.overlap(poison, gameState.playerone, (ball, player) => {
        poison.getChildren().map(child => {
            child.destroy()
        })
        
            socket.emit('interact', {
                user : 'one',
                key : keyval,
                affect : 'one',
                type : 'poison',
                shield : false
            })
        
    })
    this.physics.add.overlap(poison, fire, (ball, player) => {
        poison.getChildren().map(child => {
            child.destroy()
        })
        fire.getChildren().map(child => {
            child.destroy()
        })
    })
    this.physics.add.overlap(poison, water, (ball, player) => {
        poison.getChildren().map(child => {
            child.destroy()
        })
        water.getChildren().map(child => {
            child.destroy()
        })
    })
    this.physics.add.overlap(poison, dark, (ball, player) => {
        poison.getChildren().map(child => {
            child.destroy()
        })
        dark.getChildren().map(child => {
            child.destroy()
        })
    })
    socket.on('interact', data => {
        water.getChildren().map(child => {
            child.destroy()
        })
        fire.getChildren().map(child => {
            child.destroy()
        })
        if (data.affect === 'two') {
        if (dmgCount >1) {
            dmgCount =0
            console.log('damaged')
            gameState.playertwo.setVelocityX(0)
            ptwo.html(ptwo.html()-data.dmg)
        }
    } else if (data.affect ==='one') {
        if (dmgCount >1) {
            dmgCount =0
            console.log('damaged')
            gameState.playerone.setVelocityX(0)
            pone.html(pone.html()-data.dmg)
        }
    }
    })
    }
}
)
