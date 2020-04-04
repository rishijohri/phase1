$(function() {
    var host = window.location.host; // Get the host name here
 var socket = io.connect('http://' + host);
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
var keyval = key[0].innerText
var timer = 0
var castspell = $('#spell-cast')
var magic_and = $('#magic-wand')
var game = new Phaser.Game(config)
var gameState = {}
var dmgCount = 0;
gameState.onevel = 100
gameState.twovel = 100
gameState.onerecov = 300
gameState.tworecov = 300

function preload() {
    this.load.image('background', '/assets/backgroundtwo.jpg')
    this.load.atlas('slime', '/assets/finalpic.png', '/assets/finaldata.json')
    this.load.image('slime-0', '/assets/finstor/finale-0.png')
    this.load.image('slime-1', '/assets/finstor/finale-1.png')
    this.load.image('slime-2', '/assets/finstor/finale-2.png')
    this.load.image('slime-3', '/assets/finstor/finale-3.png')
    this.load.image('slime-4', '/assets/finstor/finale-4.png')
    this.load.image('slime-5', '/assets/finstor/finale-5.png')
    this.load.image('slime-6', '/assets/finstor/finale-6.png')
    this.load.image('slime-7', '/assets/finstor/finale-7.png')
    this.load.image('slime-8', '/assets/finstor/finale-8.png')
    this.load.image('slime-9', '/assets/finstor/finale-9.png')
    this.load.image('slime-10', '/assets/finstor/finale-10.png')
    this.load.image('slime-11', '/assets/finstor/finale-11.png')
    this.load.image('slime-12', '/assets/finstor/finale-12.png')
    this.load.image('slime-13', '/assets/finstor/finale-13.png')
    this.load.image('slime-14', '/assets/finstor/finale-14.png')
    this.load.image('slime-15', '/assets/finstor/finale-15.png')
    this.load.image('slime-16', '/assets/finstor/finale-16.png')
    this.load.image('slime-17', '/assets/finstor/finale-17.png')
    this.load.image('slime-18', '/assets/finstor/finale-18.png')
    this.load.image('slime-19', '/assets/finstor/finale-19.png')
    this.load.image('slime-20', '/assets/finstor/finale-20.png')
    this.load.image('slime-21', '/assets/finstor/finale-21.png')
    this.load.image('slime-22', '/assets/finstor/finale-22.png')
    this.load.image('slime-23', '/assets/finstor/finale-23.png')
    this.load.image('slime-24', '/assets/finstor/finale-24.png')
    this.load.image('slime-25', '/assets/finstor/finale-25.png')
    this.load.image('slime-26', '/assets/finstor/finale-26.png')
    this.load.image('slime-27', '/assets/finstor/finale-27.png')
    this.load.image('slime-28', '/assets/finstor/finale-28.png')
    this.load.image('slime-29', '/assets/finstor/finale-29.png')
    this.load.image('slime-30', '/assets/finstor/finale-30.png')
    this.load.image('slime-31', '/assets/finstor/finale-31.png')
    this.load.image('slime-32', '/assets/finstor/finale-32.png')
    this.load.image('slime-33', '/assets/finstor/finale-33.png')
    this.load.image('slime-34', '/assets/finstor/finale-34.png')
    this.load.image('slime-35', '/assets/finstor/finale-35.png')
    this.load.image('slime-36', '/assets/finstor/finale-36.png')
    this.load.image('slime-37', '/assets/finstor/finale-37.png')
    this.load.image('slime-38', '/assets/finstor/finale-38.png')
    this.load.image('slime-39', '/assets/finstor/finale-39.png')
    this.load.image('slime-40', '/assets/finstor/finale-40.png')
    this.load.image('slime-41', '/assets/finstor/finale-41.png')
    this.load.image('slime-42', '/assets/finstor/finale-42.png')
    this.load.image('slime-43', '/assets/finstor/finale-43.png')
    this.load.image('slime-44', '/assets/finstor/finale-44.png')
    this.load.image('slime-45', '/assets/finstor/finale-45.png')
    this.load.image('slime-46', '/assets/finstor/finale-46.png')
    this.load.image('slime-47', '/assets/finstor/finale-47.png')
    this.load.image('slime-48', '/assets/finstor/finale-48.png')
    this.load.image('slime-49', '/assets/finstor/finale-49.png')
    this.load.image('slime-50', '/assets/finstor/finale-50.png')
    this.load.image('slime-51', '/assets/finstor/finale-51.png')
    this.load.image('slime-52', '/assets/finstor/finale-52.png')
    this.load.image('slime-53', '/assets/finstor/finale-53.png')
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
}
$(document).keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13' || keycode == '20') {
        socket.emit('spellcast', {spell : castspell.val(), user : 'one', key: keyval, onepos: gameState.playerone.x, twopos: gameState.playertwo.x})
        castspell.val('')
    }
    
}
)
function create() {
    gameState.active = true
    gameState.background = this.add.image(767, 350, 'background')
    gameState.playerone = this.physics.add.sprite(200, 200, 'slime-0')
    gameState.playerone.setCollideWorldBounds(true);
    gameState.playertwo = this.physics.add.sprite(1000, 300, 'slime-0')
    gameState.playertwo.setCollideWorldBounds(true);
    gameState.playertwo.tint = 0xa0fa05
    this.anims.create({ key: 'idle',
        frames: [
            { key: 'slime-0' },
            { key: 'slime-1' },
            { key: 'slime-2', duration: 50 }
        ],
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({ key: 'run',
        frames: [
            { key: 'slime-9' },
            { key: 'slime-10' },
            { key: 'slime-11' },
            { key: 'slime-12', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    this.anims.create({ key: 'attack',
        frames: [
            { key: 'slime-3' },
            { key: 'slime-4' },
            { key: 'slime-5', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    this.anims.create({ key: 'defend',
        frames: [
            { key: 'slime-27' },
            { key: 'slime-28' },
            { key: 'slime-29', duration: 50 }
        ],
        frameRate: 7,
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
    gameState.playerone.play('idle')
    gameState.playertwo.play('idle')
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
                alert('user one is defeated')
                window.location ='http://' + host+ '/'
            } else if (ptwo.html()<=0) {
                alert('user two is defeated')
                window.location ='http://' + host+ '/'
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
    var dark =this.physics.add.group()
    // this sends request to move to the backend server
        if (gameState.right.isDown) {
            socket.emit('new-move', {
                move : 'right',
                user : 'one'
            })
        } else if (gameState.left.isDown) {
            socket.emit('new-move', {
                move : 'left',
                user : 'one'
            })
        } else if (gameState.up.isDown) {
            socket.emit('new-move', {
                move : 'up',
                user : 'one'
            })
        } else if (gameState.down.isDown) {
            socket.emit('new-move', {
                move : 'down',
                user : 'one'
            })
        } else if (gameState.m.isDown) {
            gameState.playerone.anims.play('defend', true)
        }
        //this is for global broadcast of movements
        socket.on('new-move', (data) => { 
            if (data.user==='one') {
              if (data.move === "right") {
                gameState.playerone.setVelocityX(gameState.onevel)
                gameState.playerone.anims.play('run', true);
                gameState.playerone.flipX = true;
              } else if (data.move === 'left') {
                gameState.playerone.setVelocityX(-gameState.onevel)
                gameState.playerone.anims.play('run', true);
                gameState.playerone.flipX = false
              } else if (data.move === 'down') {
                  gameState.playerone.setVelocityY(gameState.onevel)
                  gameState.playerone.anims.play('run', true);
              } else if (data.move === 'up') {
                gameState.playerone.setVelocityY(-gameState.onevel)
                gameState.playerone.anims.play('run', true);
                } 
        } else if (data.user==='two') {
                if (data.move === "right") {
                  gameState.playertwo.setVelocityX(gameState.twovel)
                  gameState.playertwo.anims.play('run', true);
                  gameState.playertwo.flipX = true;
                } else if (data.move === 'left') {
                  gameState.playertwo.setVelocityX(-gameState.twovel)
                  gameState.playertwo.anims.play('run', true);
                  gameState.playertwo.flipX = false
                } else if (data.move === 'down') {
                    gameState.playertwo.setVelocityY(gameState.twovel)
                    gameState.playertwo.anims.play('run', true);
                } else if (data.move === 'up') {
                  gameState.playertwo.setVelocityY(-gameState.twovel)
                  gameState.playertwo.anims.play('run', true);
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
                        gameState.playerone.play('attack')
                                if (data.vel>0) {
                                    fire.create(gameState.playerone.x+100,gameState.playerone.y, 'fire-0').setScale(0.5)
                                } else {
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
                        gameState.playerone.play('attack')
                                if (data.vel>0) {
                                    water.create(gameState.playerone.x+100,gameState.playerone.y, 'water-0').setScale(0.5)
                                } else {
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
                        gameState.onevel = 220
                        this.time.addEvent({
                            delay : 8000,
                            callback : () => {
                                gameState.onevel = 100
                            },
                            callbackScope : this,
                            loop : false
                        })
                    } else if (data.spell ==='dark ball') {
                        gameState.playerone.play('attack')
                        if (data.vel>0) {
                            dark.create(gameState.playerone.x+100,gameState.playerone.y, 'fire-0').setScale(0.5)
                            
                        } else {
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
                    } 
                }
             } else if (data.caster==='two') {
                 if (data.cost <= Number(etwo.html())) {
                     etwo.html(Number(etwo.html())-data.cost)
                    gameState.playertwo.setVelocity(0)
                    if (data.spell==='fire ball') {
                        gameState.playertwo.play('attack')
                            if (data.vel>0) {
                                fire.create(gameState.playertwo.x+100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                            } else {
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
                        gameState.playertwo.play('attack')
                            if (data.vel>0) {
                                water.create(gameState.playertwo.x+100,gameState.playertwo.y, 'water-0').setScale(0.5)
                            } else {
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
                        gameState.twovel = 220
                        this.time.addEvent({
                            delay : 8000,
                            callback : () => {
                                gameState.twovel = 100
                            },
                            callbackScope : this,
                            loop : false
                        })
                    } else if (data.spell ==='dark ball') {
                        gameState.playertwo.play('attack')
                        if (data.vel>0) {
                            dark.create(gameState.playertwo.x+100,gameState.playertwo.y, 'fire-0').setScale(0.5)
                        } else {
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
                    }
                }
                }
            }

        })
    
    
        this.physics.add.collider(fire, gameState.playerone, (ball, player) => {
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
        this.physics.add.collider(fire, gameState.playertwo, (ball, player) => {
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
        this.physics.add.collider(water, gameState.playertwo, (ball, player) => {
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
        this.physics.add.collider(water, gameState.playerone, (ball, player) => {
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
        this.physics.add.collider(dark, gameState.playerone, (ball, player) => {
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
        this.physics.add.collider(dark, gameState.playertwo, (ball, player) => {
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
        socket.on('interact', data => {
            water.getChildren().map(child => {
                child.destroy()
            })
            fire.getChildren().map(child => {
                child.destroy()
            })
            dark.getChildren().map(child => {
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
