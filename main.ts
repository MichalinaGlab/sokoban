namespace SpriteKind {
    export const skrzynki = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Top)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Top)
    doKroczek()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Left)
    doKroczek()
})
function isSzklanakula () {
	
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.skrzynki, function (sprite, otherSprite) {
    otherSprite.x += 1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Right)
    doKroczek()
})
function doKroczek () {
    petla = 8
    dx = nast1.x - sokoban.tilemapLocation().x
    dy = nast1.y - sokoban.tilemapLocation().y
    for (let index = 0; index < petla; index++) {
        sokoban.x += dx / petla
        sokoban.y += dy / petla
        pause(80 / petla)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Bottom)
    doKroczek()
})
let dy = 0
let dx = 0
let petla = 0
let nast2: tiles.Location = null
let nast1: tiles.Location = null
let skrzynka: Sprite = null
let sokoban: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
sokoban = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
sokoban.z = 2
tiles.placeOnRandomTile(sokoban, sprites.skillmap.islandTile4)
scene.cameraFollowSprite(sokoban)
sokoban.setStayInScreen(true)
for (let value of tiles.getTilesByType(sprites.castle.tileGrass1)) {
    skrzynka = sprites.create(img`
        . . b b b b b b b b b b b b . . 
        . b e 4 4 4 4 4 4 4 4 4 4 e b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b b b b b b b d d b b b b b b b 
        c b b b b b b c c b b b b b b c 
        c c c c c c b c c b c c c c c c 
        b e e e e e c b b c e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `, SpriteKind.skrzynki)
    tiles.placeOnTile(skrzynka, value)
    skrzynka.z = 1
}
