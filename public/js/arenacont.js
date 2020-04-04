var config = {
    width : 1000,
    height : 1000,
    backgroundColor : '#db6014',
    scene : {
        preload,
        create,
        update
    }
}

var game = new Phaser.Game(config)

function preload() {
    this.load.image('background', '/assets/')
}