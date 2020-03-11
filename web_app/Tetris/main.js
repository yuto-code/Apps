const MAP_WIDTH = 19; //マップサイズ（タイル）
const MAP_HEIGHT = 24; //マップサイズ（タイル）
const TILESIZE = 12; //タイルサイズ（ドット）

const WIDTH = TILESIZE * MAP_WIDTH; //仮想画面サイズ 幅
const HEIGHT = TILESIZE * MAP_HEIGHT; //仮想画面サイズ 高さ

const FONT = "30px monospace"
const SMOOTH = 0;
const WAIT = 10;

let MAP = [
    [9, 9, 9, 9, 9, 7, 7, 7, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 8, 8, 8, 8, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 9, 9, 9, 9, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 9, 9, 9, 9, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 9, 9, 9, 9, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 9, 9, 9, 9, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 7, 9],
    [9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];

let TILE = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],[
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ],[
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],[
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],[
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ],[
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
    ],[
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
    ],
];

let gScreen; //仮想画面
let gWidth; //実画面の幅
let gHeight; //実画面の高さ
let gImgMap; //画像マップ

let KeyX=0, KeyZ=0, KeyR=0, KeyL=0;
let onKeyX=false, onKeyZ=false, onKeyR=false, onKeyL=false;
let mX=0, mY=0, mA=0, mT=0, mTnext=[0, 0, 0, 0];
let mWait=0;
let align=false;
let mGameOver=false;


function tilePut(x, y, a, t){
    for(let j=0; j<4; j++){
        for(let i=0; i<4; i++){
            let p = [i  , 3-j, 3-i,   j];
            let q = [j  ,   i, 3-j, 3-i];
            if(TILE[t][q[a]][p[a]] == 0){
                continue;
            }
            MAP[y+j][x+i] = t;    
        }
    }
}

function tileDelete(x, y, a, t){
    for(let j=0; j<4; j++){
        for(let i=0; i<4; i++){
            let p = [i  , 3-j, 3-i,   j];
            let q = [j  ,   i, 3-j, 3-i];
            if(TILE[t][q[a]][p[a]] == 0){
                continue;
            }
            MAP[y+j][x+i] = 7;    
        }
    }
}

function tilePutTest(x, y, a, t){
    for(let j=0; j<4; j++){
        for(let i=0; i<4; i++){
            let p = [i  , 3-j, 3-i,   j];
            let q = [j  ,   i, 3-j, 3-i];
            if(TILE[t][q[a]][p[a]] == 0){
                continue;
            }
            if(MAP[y+j][x+i] != 7){
                return false;
            }    
        }
    }
    return true;
}

function DrawMain(){
    const g = gScreen.getContext("2d"); // 仮想画面の2D描画コンテキスト
    for(let y=0; y<MAP_HEIGHT; y++){
        for(let x=0; x<MAP_WIDTH; x++){
            DrawTile(g, x*TILESIZE, y*TILESIZE, MAP[y][x]);
        }
    }
    if(mGameOver){
        g.font = FONT // 文字フォントを設定
        g.fillStyle = "#0ff";
        g.fillText("GAME OVER", 16, 120);
    }
}

function DrawTile(g, x, y, idx){
    g.drawImage(gImgMap, TILESIZE*idx, 0, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
}

function Paint(){
    DrawMain();

    const ca = document.getElementById("main"); // mainキャンパスの要素を取得
    const g = ca.getContext("2d"); // 2D描画コンテキスト
    g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight); // 仮想画面のイメージを実画面へ転送
}

// ブラウザサイズ変更イベント
function CaSize(){
    const ca = document.getElementById("main"); // mainキャンパスの要素を取得
    ca.width = window.innerWidth; // キャンパスの幅をブラウザへ変更
    ca.height = window.innerHeight; // キャンパスの高さをブラウザへ変更
    
    const g = ca.getContext("2d"); // 2D描画コンテキスト
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;

    // 実画面サイズ計測, ドットのアスペクト比を維持したままでの最大サイズを計測
    gWidth = ca.width;
    gHeight = ca.height;
    if(gWidth / WIDTH < gHeight / HEIGHT){
        gHeight = gWidth*HEIGHT/WIDTH;
    }else{
        gWidth = gHeight*WIDTH/HEIGHT;
    }
}

function Align(){
    if(align == true){
        for(let j=MAP_HEIGHT-3; j>1; j--){
            for(let i=2; i<12; i++){
                if(MAP[j][i] != 10) break;
                for(let y=j; y>1; y--){
                    for(let x=2; x<12; x++){
                        if(y > 2){
                            MAP[y][x]=MAP[y-1][x];
                        }else{
                            MAP[y][x]=7;
                        }
                    }
                }
            }
        }
        align=false;
    }

    for(let j=MAP_HEIGHT-3; j>1; j--){
        let n=0;
        for(let i=2; i<12; i++){
            if(MAP[j][i] < 7){
                n++;
            }
        }
        if(n == 10){
            for(let i=2; i<12; i++){
                MAP[j][i] = 10;
            }
            align = true;
            mWait = Math.floor(WAIT);
        }
    }
}

function blockSet(){

    if(mWait == 0 && align == false){
        Next();
    }
    if(align == false){
        tileDelete(mX, mY, mA, mT);
    
        let x=mX, a=mA;

        if(KeyL==1 && onKeyL==false) {x--; onKeyL=true;}
        if(KeyR==1 && onKeyR==false) {x++; onKeyR=true;}
        if(tilePutTest(x, mY, mA, mT)){
            mX = x;
        }  
        
        if(KeyZ==1 && onKeyZ==false) {a++; onKeyZ=true;}
        if(KeyX==1 && onKeyX==false) {a--; onKeyX=true;} 
        a &= 3;
        if(tilePutTest(mX, mY, a, mT)){
            mA = a;
        }

        if(tilePutTest(mX, mY+1, mA, mT)){
            mY = mY+1;
            mWait = WAIT;
        }else{
            mWait--;
        }

        tilePut(mX, mY, mA, mT);
    }else{
        mWait--;
    }

    if(mWait == 0){
        Align();
    }

}

//タイマーイベント発生時処理
function Timer(){
    if(mGameOver){
        Paint();
        return;
    }
    blockSet();
    Paint();
    
}

function Next(){

    tileDelete(14, 3, 0, mTnext[0]);
    tileDelete(14, 8, 0, mTnext[1]);
    tileDelete(14, 13, 0, mTnext[2]);
    tileDelete(14, 18, 0, mTnext[3]);
    
    mWait = WAIT;
    mX=5; mY=0; mA=0;
    mT = mTnext[0];
    mTnext[0] = mTnext[1];
    mTnext[1] = mTnext[2];
    mTnext[2] = mTnext[3];
    mTnext[3] = Math.floor(Math.random() * 7); 
    
    if(tilePutTest(mX, mY, mA, mT)){
        tilePut(mX, mY, mA, mT);
    }else{
        mGameOver = true;
    }
    
    tilePut(14, 3, 0, mTnext[0]);
    tilePut(14, 8, 0, mTnext[1]);
    tilePut(14, 13, 0, mTnext[2]);
    tilePut(14, 18, 0, mTnext[3]);

}

window.onkeydown = function(event){
    let c = event.keyCode;
    if(c == 37) KeyL++; //Left
    if(c == 39) KeyR++; //Right
    if(c == 90) KeyZ++; //Z
    if(c == 88) KeyX++; //X

}

window.onkeyup = function(event){
    let c = event.keyCode;
    if(c == 37) {KeyL=0; onKeyL=false;} //Left
    if(c == 39) {KeyR=0; onKeyR=false;} //Right
    if(c == 90) {KeyZ=0; onKeyZ=false;} //Z
    if(c == 88) {KeyX=0; onKeyX=false;} //X
}

// ブラウザ起動イベント
window.onload = function(){
    gImgMap = new Image(); gImgMap.src = "tile.png";

    gScreen = this.document.createElement("canvas"); //仮想画面作成
    gScreen.width = WIDTH; //仮想画面の幅を設定
    gScreen.height = HEIGHT; //仮想画面の高さを設定

    CaSize(); // 画像サイズ初期化
    window.addEventListener("resize", function(){CaSize()}); //ブラウザサイズ変更時実行関数
    
    mT = Math.floor(Math.random() * 7);
    mTnext[0] = Math.floor(Math.random() * 7);
    mTnext[1] = Math.floor(Math.random() * 7);
    mTnext[2] = Math.floor(Math.random() * 7);
    mTnext[3] = Math.floor(Math.random() * 7); 
    
    setInterval(function(){Timer()}, 100); // 33ms間隔実行
}