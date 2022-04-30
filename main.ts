namespace SpriteKind {
    export const skrzynki = SpriteKind.create()
}
function isCzyKoniecLevela () {
    for (let value of sprites.allOfKind(SpriteKind.skrzynki)) {
        if (value.tileKindAt(TileDirection.Center, sprites.castle.tileGrass2)) {
        	
        } else {
            return false
        }
    }
    return true
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Top)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Top)
    doKroczek()
})
function doKasujSprajty () {
    sprites.destroyAllSpritesOfKind(SpriteKind.skrzynki)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
}
function doUstawMape (level: number) {
    doKasujSprajty()
    if (level == 4) {
        tiles.setCurrentTilemap(tilemap`level0`)
    } else if (level == 0) {
        tiles.setCurrentTilemap(tilemap`level4`)
    } else if (level == 1) {
        tiles.setCurrentTilemap(tilemap`level6`)
    } else if (level == 2) {
        tiles.setCurrentTilemap(tilemap`level`)
    } else if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level7`)
    } else {
    	
    }
    doInicjujSprajty()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Left)
    doKroczek()
})
function isSzklanakula () {
    if (tiles.tileAtLocationIsWall(nast1)) {
        music.knock.play()
        return false
    } else if (isSkrzynia(nast1.row, nast1.column)) {
        if (tiles.tileAtLocationIsWall(nast2) || isSkrzynia(nast2.row, nast2.column)) {
            music.knock.play()
            return false
        }
    } else {
        return true
    }
    return true
}
function isSkrzynia (wiersz: number, kolumna: number) {
    for (let value of sprites.allOfKind(SpriteKind.skrzynki)) {
        if (value.tilemapLocation().column == kolumna && value.tilemapLocation().row == wiersz) {
            return true
        }
    }
    return false
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.skrzynki, function (sprite, otherSprite) {
    doMove(otherSprite)
    if (otherSprite.tileKindAt(TileDirection.Center, sprites.castle.tileGrass2)) {
        music.pewPew.play()
        otherSprite.setImage(img`
            . b b b b b b b b b b b b b b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b b b b b b b d d b b b b b b b 
            . b b b b b b c c b b b b b b . 
            b c c c c c b c c b c c c c c b 
            b c c c c c c b b c c c c c c b 
            b c c c c c c c c c c c c c c b 
            b c c c c c c c c c c c c c c b 
            b b b b b b b b b b b b b b b b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `)
        if (isCzyKoniecLevela()) {
            music.magicWand.play()
            game.splash("Brawo! Szykuj się")
            level += 1
            if (level > maxLevel) {
                game.over(true)
            }
            doUstawMape(level)
        }
    } else {
        otherSprite.setImage(img`
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
            `)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Right)
    doKroczek()
})
function doKroczek () {
    if (isSzklanakula()) {
        doMove(sokoban)
        info.changeScoreBy(1)
    }
}
function doMove (mySprite: Sprite) {
    petla = 8
    dx = nast1.x - sokoban.tilemapLocation().x
    dy = nast1.y - sokoban.tilemapLocation().y
    for (let index = 0; index < petla; index++) {
        mySprite.x += dx / petla
        mySprite.y += dy / petla
        pause(80 / petla)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    nast1 = sokoban.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)
    nast2 = nast1.getNeighboringLocation(CollisionDirection.Bottom)
    doKroczek()
})
function doInicjujSprajty () {
    info.setScore(0)
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
}
let skrzynka: Sprite = null
let dy = 0
let dx = 0
let petla = 0
let nast2: tiles.Location = null
let sokoban: Sprite = null
let nast1: tiles.Location = null
let maxLevel = 0
let level = 0
level = 3
info.setScore(0)
doUstawMape(level)
maxLevel = 1
