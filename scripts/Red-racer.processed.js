const t = [
    "grass",
    "grass",
    "left-gutter",
    "left-road",
    "middle-road",
    "middle-road",
    "right-road",
    "right-gutter",
    "grass",
    "grass",
],
e = [96, 224],
s = ["tree", "flower"],
a = {
    fontFamily: "'Luckiest Guy', cursive",
    fontSize: "24px",
    stroke: "#000000",
    strokeThickness: 4,
};
function i(t) {
return null == t;
}
function r(t, e, s) {
return (
    (t *= s = 10 ** (s = i(s) ? 0 : s)),
    (e *= s),
    Math.round(Math.random() * (e - t) + t) / s
);
}
function o(t) {
t.scene.key, t.cameras.main.fadeIn(256);
}
function n(t, e) {
t.scene.key,
    t.cameras.main.fadeOut(256),
    t.cameras.main.once(
        "camerafadeoutcomplete",
        () => {
            t.scene.start(e);
        },
        t
    );
}
function h(t, e, s) {
t.load.image(e, `./assets/images/${s}`);
}
function c(t, e, s, a, i) {
    t.load.spritesheet(e, `./assets/images/${s}`, {
        frameWidth: a,
        frameHeight: i,
    });
    }
function d(t, e, s) {
t.load.audio(e, `./assets/audios/${s}`);
}
function l(t, e, a) {
if (r(0, 100) > 20) return;
const i = r(0, s.length - 1),
    o = s[i];
t.add
    .image(e, a, o)
    .setOrigin(r(0, 1, 3))
    .setDepth(a + 2);
}
function p(e, s) {
for (let a = 0; a < t.length; a++) {
    const i = t[a],
        r = a * 32;
    let o = e.add.image(r, s, i).setOrigin(0).setDepth(s);
    e.roadGroup.add(o), "grass" === i && l(e, r, s);
}
}
function u(t) {
t.roadGroup = t.add.group();
for (let e = -32; e < 480; e += 32) p(t, e);
}
function g(t, e) {
(t.character =
    !0 === e
        ? t.physics.add.sprite(160, 360, "character")
        : t.add.image(160, 360, "character")),
    t.character.setDepth(480);
}
function m(t, e) {
const s = t.add
    .text(160, 384, e, a)
    .setOrigin(0.5, 0.5)
    .setScrollFactor(0)
    .setDepth(480)
    .setInteractive();
return (
    t.tweens.add({
        targets: s,
        alpha: 0,
        ease: "Sine.easeOut",
        duration: 1024,
        repeat: -1,
        yoyo: !0,
    }),
    s
);
}
function f(t, e, s, i, r) {
const o = a;
o.fontSize = r;
const n = t.add.text(e, s, i, o);
return (o.fontSize = "24px"), n;
}
function y(t) {
(t.soundControl = t.add
    .sprite(288, 16, "sound")
    .setOrigin(0)
    .setScrollFactor(0)
    .setDepth(480)
    .setInteractive()),
    !0 === t.sound.mute && t.soundControl.setFrame(1),
    t.soundControl.on("pointerdown", (e, s, a, i) => {
        i.stopPropagation();
        let r = !t.sound.mute;
        t.sound.setMute(r),
            t.selectSound.play(),
            t.soundControl.setFrame(!0 === r ? 1 : 0);
    });
}
function C(t) {
(t.accelerateSound = t.sound.add("accelerate")),
    (t.crashedSound = t.sound.add("crashed")),
    (t.driveSound = t.sound.add("drive")),
    (t.overtakeSound = t.sound.add("overtake")),
    (t.selectSound = t.sound.add("select")),
    (t.startSound = t.sound.add("start"));
}
class S extends Phaser.Scene {
constructor() {
    super("Loading");
}
setAssets() {
    h(this, "character", "infinite-cars-character.png"),
        h(this, "flower", "infinite-cars-flower.png"),
        h(this, "grass", "infinite-cars-grass.png"),
        h(this, "left-road", "infinite-cars-left-road.png"),
        h(this, "middle-road", "infinite-cars-middle-road.png"),
        h(this, "right-road", "infinite-cars-right-road.png"),
        h(this, "tree", "infinite-cars-tree.png"),
        h(this, "left-gutter", "infinite-cars-left-gutter.png"),
        h(this, "right-gutter", "infinite-cars-right-gutter.png"),
        c(this, "explosion", "infinite-cars-explosion.png", 32, 32),
        c(this, "stop-light", "infinite-cars-stop-light.png", 96, 240),
        c(this, "sound", "infinite-cars-sound.png", 16, 16),
        d(this, "accelerate", "accelerate.wav"),
        d(this, "crashed", "crashed.wav"),
        d(this, "drive", "drive.wav"),
        d(this, "overtake", "overtake.wav"),
        d(this, "select", "select.wav"),
        d(this, "start", "start.wav");
}
createLoader() {
    const t = this.add.graphics(),
        e = this.add.graphics();
    t.fillStyle(16777215, 1),
        t.fillRect(64, 228, 192, 24),
        this.load.on("progress", (t) => {
            e.clear(),
                e.fillStyle(1351726, 1),
                e.fillRect(66, 230, 188 * t, 20);
        }),
        this.load.on("fileprogress", (t) => {
            t.key;
        }),
        this.load.on("complete", (t) => {
            t.totalComplete, t.totalToLoad, n(this, "Main");
        });
}
preload() {
    this.setAssets(),
        this.createLoader(),
        this.load.on("complete", (t) => {
            t.totalComplete, t.totalToLoad, n(this, "Main");
        });
}
}
class w extends Phaser.Scene {
constructor() {
    super("Main");
}
addBanner() {
    const t = "#ffd541",
        e = "#df3e23";
    f(this, 160, 128, "Red Racer", "40px")
        .setDepth(480)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setColor(t)
        .setStroke(e, 8),
        f(this, 160, 176, "Car game", "24px")
            .setDepth(480)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setColor(t)
            .setStroke(e, 8);
}
addStartButton() {
    const t = m(this, "Press anywhere");
    t.x,
        t.y,
        this.input.once("pointerdown", (t) => {
            this.selectSound.play(), n(this, "Game");
        });
}
addHighScore() {
    try {
        0;
        const t = 480,
            e = localStorage.getItem("CarsHighScore");
        f(
            this,
            16,
            16,
            `High score: ${null !== e ? e : ""}`,
            "16px"
        ).setDepth(t + 100);
    } catch (t) {}
}
initialize() {
    u(this),
        g(this, !1),
        y(this),
        C(this),
        this.addBanner(),
        this.addStartButton(),
        this.addHighScore();
}
create() {
    o(this), this.initialize();
}
}
class v extends Phaser.Scene {
constructor() {
    super("Game");
}
setCamera() {
    this.cameras.main.startFollow(this.character, !0, 0, 1, 0, 120);
}
createExplosionAnimation() {
    this.anims.create({
        key: "explosion",
        frames: this.anims.generateFrameNumbers("explosion", {
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: -1,
    });
}
drawBoundary() {}
setCharacterBoundary() {
    let t = e[0],
        s = e[1];
    (this.boundary = new Phaser.Geom.Rectangle(t, -32, s - t, 480)),
        this.character.setCollideWorldBounds(!0),
        this.character.body.setBoundsRectangle(this.boundary),
        this.drawBoundary();
}
setControls() {
    this.character.setInteractive(),
        this.input.setDraggable(this.character),
        this.input.on("drag", (t, e, s, a) => {
            !0 !== this.physics.world.isPaused && this.character.setX(s);
        });
}
addObjects() {
    (this.roadCones = this.physics.add.staticGroup()),
        (this.computerCars = this.physics.add.group()),
        (this.computerCars.defaults = {});
}
addExplosion() {
    this.add
        .sprite(this.character.x, this.character.y, "explosion")
        .setDepth(480)
        .setScale(1.5)
        .anims.play("explosion");
}
createRetryButton() {
    const t = m(this, "Press anywhere");
    t.x,
        t.y,
        this.input.once("pointerdown", (t) => {
            this.crashedSound.stop(),
                this.selectSound.play(),
                this.scene.restart();
        });
}
setHighScore() {
    const t = this.score.getData("value");
    try {
        let e = localStorage.getItem("InfiniteCarsHighScore");
        if (((e = parseFloat(e)), e > t)) return;
        localStorage.setItem("InfiniteCarsHighScore", t);
    } catch (t) {}
}
setGameOver() {
    this.physics.world.pause(), this.setHighScore();
    f(this, 160, 240, "Crashed!", "24px")
        .setDepth(580)
        .setOrigin(0.5, 0.5)
        .setScrollFactor(0);
    try {
        const t = localStorage.getItem("InfiniteCarsHighScore");
        f(this, 160, 272, `High score: ${t}`, "16px")
            .setDepth(580)
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0);
    } catch (t) {}
    this.addExplosion(),
        this.accelerateSound.stop(),
        this.driveSound.stop(),
        this.crashedSound.play(),
        this.createRetryButton();
}
setCollisions() {
    this.physics.add.collider(this.character, this.roadCones, () => {
        this.setGameOver();
    }),
        this.physics.add.collider(this.character, this.computerCars, () => {
            this.setGameOver();
        }),
        this.physics.add.collider(this.roadCones, this.roadCones),
        this.physics.add.collider(this.roadCones, this.computerCars),
        this.physics.add.collider(this.computerCars, this.computerCars)
}
initializeScore() {
    this.score = f(this, 16, 16, "Score: 0", "16px")
        .setDepth(580)
        .setScrollFactor(0)
        .setDataEnabled()
        .setData("value", 0);
}
setStarter() {
    this.anims.create({
        key: "stop-light",
        frames: this.anims.generateFrameNumbers("stop-light", {
            start: 0,
            end: 3,
        }),
        frameRate: 1,
    });
    this.stopLight = this.add
        .sprite(160, 240, "stop-light")
        .setScrollFactor(0)
        .setDepth(480);
    (this.instructions = f(
        this,
        160,
        400,
        "Drag the red car to move",
        "16px"
    )
        .setDepth(480)
        .setOrigin(0.5)
        .setScrollFactor(0)),
        this.stopLight.anims.play("stop-light"),
        this.startSound.play(),
        this.time.addEvent({
            delay: 4e3,
            callback: () => {
                this.physics.world.resume(),
                    this.tweens.add({
                        targets: [this.stopLight, this.instructions],
                        alpha: 0,
                        ease: "Sine.easeOut",
                        duration: 512,
                        onComplete: () => {
                            this.stopLight.destroy(),
                                this.instructions.destroy(),
                                this.accelerateSound.play(),
                                this.accelerateSound.addListener(
                                    "complete",
                                    () => {
                                        this.driveSound.play({ loop: !0 });
                                    }
                                );
                        },
                    });
            },
        });
}
initialize() {
    (this.lowestMapY = -32),
        u(this),
        g(this, !0),
        y(this),
        C(this),
        this.physics.world.pause(),
        this.setCharacterBoundary(),
        this.setControls(),
        this.setCamera(),
        this.createExplosionAnimation(),
        this.addObjects(),
        this.setCollisions(),
        this.character.setVelocityY(-192),
        this.initializeScore(),
        this.setStarter();
}
create() {
    o(this), this.initialize();
}
repositionBoundary() {
    const t = e[0];
    this.boundary.setPosition(t, this.cameras.main.scrollY),
        this.drawBoundary();
}
addRoad() {
    return (
        !(this.cameras.main.scrollY - 32 > this.lowestMapY) &&
        ((this.lowestMapY -= 32), p(this, this.lowestMapY), !0)
    );
}
getRoadBoundary() {
    return r(e[0], e[1], 3);
}
addRoadCone() {
    if (r(0, 100) > 6.5) return;
    const t = this.getRoadBoundary(),
        e = this.physics.add
            .staticImage(t, this.lowestMapY, "road-cone")
            .setDepth(480);
    this.roadCones.add(e);
}
removeRoadCone() {
    for (const t of this.roadCones.getChildren())
        if (t.y > this.character.y + 120) {
            t.destroy();
            break;
        }
}
addComputerCar() {
    if (r(1, 100) > 6.5) return;
    const t = !(r(1, 100) < 50),
        e = this.getRoadBoundary();
    let s = this.lowestMapY,
        a = 96,
        i = 144;
    !0 === t && ((s += 960), (a = 256), (i = 320));
    const o = r(a, i),
        n = this.physics.add
            .sprite(e, s, "computer")
            .setDepth(480)
            .setOrigin(0.5, 1)
            .refreshBody()
            .setDataEnabled()
            .setData("isFast", t)
            .setData("velocity", -1 * o)
            .setVelocityY(-o);
    this.computerCars.add(n);
}
removeComputerCar() {
    const t = this.character.y;
    for (const e of this.computerCars.getChildren()) {
        const s = e.data.list.isFast,
            a = e.y;
        if ((!1 === s && a > t + 120) || (!0 === s && a < t - 960)) {
            e.destroy();
            break;
        }
    }
}
dodgeComputerCar() {
    for (const t of this.computerCars.getChildren()) {
        const s = t.width,
            a = t.x,
            o = t.y,
            n = [].concat(
                this.roadCones.getChildren(),
                this.computerCars.getChildren()
            );
        let h = t.data.list.direction,
            c = !1;
        for (const t of n) {
            const e = t.width,
                i = t.x,
                r = t.y;
            if (
                !(r > o) &&
                Math.abs(r - o) <= 240 &&
                ((a - s / 2 < i - e / 2 && a + s / 2 > i - e / 2) ||
                    (i - e / 2 < a - s / 2 && i + e / 2 > a - s / 2))
            ) {
                c = !0;
                break;
            }
        }
        !1 !== c
            ? (!0 === i(h) && (h = r(0, 1)),
              0 === h && (h = -1),
              ((-1 === h && a - s / 2 < e[0]) ||
                  (1 === h && a + s / 2 > e[1])) &&
                  (h *= -1),
              t.setData("direction", h),
              t.setVelocityX(48 * h))
            : (t.setVelocityX(0), t.setVelocityY(t.data.list.velocity));
    }
}
setScore() {
    const t = Math.abs(this.character.y - 360),
        e = Math.round(100 * t) / 100,
        s = `Score: ${e}`;
    this.score.setText(s), this.score.setData("value", e);
}
setOvertake() {
    for (const t of this.computerCars.getChildren())
        Math.floor(t.y) === Math.floor(this.character.y) &&
            this.overtakeSound.play();
}
updateWorld() {
    if (!0 === this.physics.world.isPaused) return;
    this.repositionBoundary();
    !0 === this.addRoad() && (this.addRoadCone(), this.addComputerCar()),
        this.removeRoadCone(),
        this.removeComputerCar(),
        this.dodgeComputerCar(),
        this.setScore(),
        this.setOvertake();
}
update() {
    this.updateWorld();
}
}
new Phaser.Game({
type: Phaser.AUTO,
parent: "Red racer",
pixelArt: !0,
physics: { default: "arcade", arcade: { debug: false } },
scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 320,
    height: 480,
    min: { width: 40, height: 60 },
    max: { width: 1280, height: 1920 },
},
scene: [S, w, v],
});