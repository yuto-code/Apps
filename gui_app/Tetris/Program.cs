using System;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;

class Program : Form{

    static readonly int TILE_SIZE = 12;
    static readonly int TIMER_INTERVAL = 16;
    static readonly int MAP_WIDTH = 14;
    static readonly int MAP_HEIGHT = 25;
    static readonly int SCR_WIDTH = MAP_WIDTH * TILE_SIZE;
    static readonly int SCR_HEIGHT = MAP_HEIGHT * TILE_SIZE;
    static readonly int WND_WIDTH = SCR_WIDTH * 2;
    static readonly int WND_HEIGHT = SCR_HEIGHT * 2;
    static readonly int WAIT = 60;

    static readonly byte[,,] mBlock = {
        {
            {0, 0, 0, 0},
            {1, 1, 1, 1},
            {0, 0, 0, 0},
            {0, 0, 0, 0},
        },{
            {0, 0, 0, 0},
            {0, 1, 1, 1},
            {0, 1, 0, 0},
            {0, 0, 0, 0},
        },{
            {0, 0, 0, 0},
            {0, 1, 1, 0},
            {0, 1, 1, 0},
            {0, 0, 0, 0},
        },{
            {0, 0, 0, 0},
            {1, 1, 0, 0},
            {0, 1, 1, 0},
            {0, 0, 0, 0},
        },{
            {0, 0, 0, 0},
            {1, 1, 1, 0},
            {0, 1, 0, 0},
            {0, 0, 0, 0},
        },{
            {0, 0, 0, 0},
            {1, 1, 1, 0},
            {0, 0, 1, 0},
            {0, 0, 0, 0},
        },{
            {0, 0, 0, 0},
            {0, 1, 1, 0},
            {1, 1, 0, 0},
            {0, 0, 0, 0},
        },
    };

    byte[,] mField = {
        {9, 9, 9, 9, 9, 7, 7, 7, 7, 9, 9, 9, 9, 9},
        {9, 9, 9, 9, 9, 7, 7, 7, 7, 9, 9, 9, 9, 9},
        {9, 8, 8, 8, 8, 7, 7, 7, 7, 8, 8, 8, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9},
        {9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9},
        {9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9},
    };
    
    Bitmap mScreen = new Bitmap(SCR_WIDTH, SCR_HEIGHT);
    Bitmap[] mTile;
    int mX, mY, mA, mWait;
    byte mT, mNext;
    int mKeyL, mKeyR, mKeyX, mKeyZ; 
    Random mRnd = new Random();
    bool mGameOver;
    int mTimer;

    protected override void OnKeyDown(KeyEventArgs e){
        if(e.KeyCode == Keys.Left) mKeyL++;
        if(e.KeyCode == Keys.Right) mKeyR++;
        if(e.KeyCode == Keys.X) mKeyX++;
        if(e.KeyCode == Keys.Z) mKeyZ++;
    }

    protected override void OnKeyUp(KeyEventArgs e){
        if(e.KeyCode == Keys.Left) mKeyL=0;
        if(e.KeyCode == Keys.Right) mKeyR=0;
        if(e.KeyCode == Keys.X) mKeyX=0;
        if(e.KeyCode == Keys.Z) mKeyZ=0;
    }

    protected override void OnLoad(EventArgs e){
        ClientSize = new Size(WND_WIDTH, WND_HEIGHT);
        DoubleBuffered = true;

        var bm = new Bitmap("tile.png");
        int len = bm.Width / TILE_SIZE;
        mTile = new Bitmap[len];    // 1tileの長さ

        for(int i=0; i<len; i++){
            mTile[i] = bm.Clone(new Rectangle(i*TILE_SIZE, 0, TILE_SIZE, TILE_SIZE), bm.PixelFormat);
        }

        mNext = (byte)mRnd.Next(7);
        next();

        Task.Run(() =>{
            mTimer = System.Environment.TickCount;
            while(true){
                onTimer();
                mTimer += TIMER_INTERVAL;
                Task.Delay(Math.Max(1, mTimer-System.Environment.TickCount)).Wait();
            }
        });
    }
    protected override void OnPaint(PaintEventArgs e){
        var g = Graphics.FromImage(mScreen);
        for(int y=0; y<MAP_HEIGHT; y++){
            for(int x=0;x<MAP_WIDTH;x++){
                // 仮想画面に描画
                g.DrawImage(mTile[mField[y,x]], x*TILE_SIZE, y*TILE_SIZE);
            }
        }

        if(mGameOver){
            g.DrawString("GAMW OVER", new Font("Meiryo", 16), Brushes.White, 16, 64);
        }

        float a = Math.Min((float)ClientSize.Width / SCR_WIDTH,
                           (float)ClientSize.Height / SCR_HEIGHT);

        // 仮想画面に描画したものを実画面に転送
        e.Graphics.DrawImage(mScreen, 0, 0, SCR_WIDTH*a, SCR_HEIGHT*a);
    }
    void next(){
        mX = 5;
        mY = 2;
        mT = mNext;
        mWait = WAIT;

        mA = 0;
        if(mKeyX > 0) mA=3;
        if(mKeyZ > 0) mA=1;
        
        if(!put(mX, mY, mT, mA, true, false)){
            mGameOver = true;
        }
        put(5, -1, mNext, 0, false, false);
        mNext = (byte)mRnd.Next(7);
        put(5, -1, mNext, 0, true, false);

    }

    public static void Main(String[] args){
        Application.Run(new Program());
    }

    void onTimer(){

        tick();

        if(mKeyL > 0) mKeyL++;
        if(mKeyR > 0) mKeyR++;
        if(mKeyX > 0) mKeyX++;
        if(mKeyZ > 0) mKeyZ++;

        Invalidate();
    }

    /*
        param bool s falseの場合消す
    */
    bool put(int x, int y, byte t, int a, bool s, bool test){
        for(int j=0; j<4; j++){
            for(int i=0; i<4; i++){
                int[] p = {i  , 3-j, 3-i,   j};
                int[] q = {j  ,   i, 3-j, 3-i};
                if(mBlock[t, q[a], p[a]] == 0){
                    continue;
                }
                byte v = t;
                if(!s){
                    v=7;
                }else if(mField[y+j, x+i] != 7){
                    return false;
                }

                if(!test){
                    mField[y+j, x+i] = v;
                }
            }
        }
        return true;
    }
    
    void tick(){
        if(mGameOver){
            return;
        }
        if(mWait <= WAIT/2){
            wait();
            return;
        }
        
        put(mX, mY, mT, mA, false, false);

        int a = mA;
        if(mKeyX == 1) a--;
        if(mKeyZ == 1) a++;
        a &= 3;
        if(put(mX, mY, mT, a, true, true)){
            mA = a;
        }

        int x = mX;
        if(mKeyL == 1 || mKeyL > 20) x--;
        if(mKeyR == 1 || mKeyR > 20) x++;
        if(put(x, mY, mT, mA, true, true)){
            mX = x;
        }
        
        if(put(mX, mY+1, mT, mA, true, true)){
            mY++;
            mWait = WAIT;
        }else{
            mWait--;
        }

        put(mX, mY, mT, mA, true, false);
    }

    void wait(){
        if(--mWait == 0){
            next();
        }
        if(mWait == WAIT/2 - 1){
            for(int y=22; y>2; y--){
                int n=0;
                for(int x=2; x<12; x++){
                    if(mField[y, x] < 7){
                        n++;
                    }
                }
                if(n != 10){
                    continue;
                }
                for(int x=2; x<12; x++){
                    mField[y, x] = 10;
                }
            }
        }
        if(mWait==1){
            for(int y=22; y>2; y--){
                if(mField[y, 2] != 10){
                    continue;
                }
                mWait = WAIT/2 - 2;
                for(int i=y; i>3; i--){
                    for(int x=2; x<12; x++){
                        mField[i, x] = mField[i-1, x];
                    }
                }
                for(int x=2; x<12; x++){
                    mField[3, x] = 7;
                }
                y++;
            }
        }
    }
}