from tkinter import  *
from tkinter import messagebox
from tkinter.ttk import *
import time
import random

class Minesweeper():

    WIDTH_MASS = 10
    HEIGHT_MASS = 10

    def window_setup(self):
        """ウィンドウ設定"""
        # メインウィンドウ生成
        self.root = Tk()
        # ウィンドウのタイトル
        self.root.title('Minesweeper')
        # ウィンドウの大きさを決定
        self.root.geometry(str(self.WIDTH_MASS*30)+"x"+str(60+self.HEIGHT_MASS*30))
        # ウィンドウサイズ固定
        self.root.resizable(0, 0)

    def reset(self):
        self.start = time.time()
        self.bomb_set()
        self.draw()

    
    def val_changed(self, val):
        def f():
            self.WIDTH_MASS = val[1].get()
            self.HEIGHT_MASS = val[2].get()
            self.BOMB_NUM = round(val[0].get()/100*self.WIDTH_MASS*self.HEIGHT_MASS)
            self.root.geometry(str(self.WIDTH_MASS*30)+"x"+str(60+self.HEIGHT_MASS*30))
            self.reset()
            print(self.BOMB_NUM)
        return f

    def setting_change(self):
        """設定"""
        sub_win = Toplevel(master=self.root)

        sub_win.geometry("300x180")
        sub_win.resizable(0, 0)
        sub_win.grid_columnconfigure(0, weight=1)
        sub_win.grid_rowconfigure(0, weight=1)
        
        frame_settiing = Frame(sub_win)
        frame_settiing.grid(row=0, column=0, sticky='nwse')
        frame_settiing.grid_columnconfigure((0, 1), weight=1)
        frame_settiing.grid_rowconfigure((0, 1, 2, 3, 4, 5), weight=1)

        val = [IntVar() for i in range(3)]
        for i in val: i.set(10)

        spinbox = [
            Spinbox(
                frame_settiing,
                from_ = 10,
                to = 90,
                width = 10,
                state = "readonly",
                textvariable = val[0],
            ),
            Spinbox(
                frame_settiing,
                from_ = 10,
                to = 30,
                width = 10,
                state = "readonly",
                textvariable = val[1],
            ),
            Spinbox(
                frame_settiing,
                from_ = 10,
                to = 20,
                width = 10,
                state = "readonly",
                textvariable = val[2],
            ),
        ]

        label_bomb_rate = Label(frame_settiing, text="爆弾の割合（10から90％）")
        label_bomb_rate.grid(row=0, column=0, columnspan=2)
        spinbox[0].grid(row=1, column=0, columnspan=2)

        label_width_mass = Label(frame_settiing, text="横マスの数（10から30マス）")
        label_width_mass.grid(row=2, column=0)
        spinbox[1].grid(row=3, column=0, columnspan=1)

        label_height_mass = Label(frame_settiing, text="縦マスの数（10から20マス）")
        label_height_mass.grid(row=2, column=1)
        spinbox[2].grid(row=3, column=1, columnspan=1)

        button_ok = Button(
            frame_settiing,
            text = 'OK',
            width = str("OK"),
            padding = (30, 0),
            command = self.val_changed(val)
        )
        
        button_ok.grid(row=5, column=0, columnspan=2)

    def menu_setup(self):
        """メニュー設定"""
        #メニューバー作成
        self.menubar = Menu(self.root)
        #fileメニュー追加
        self.filemenu = Menu(self.menubar, tearoff=0)
        self.menubar.add_cascade(label='設定', menu=self.filemenu)
        self.filemenu.add_command(label='大きさ変更', command=self.setting_change)
        self.filemenu.add_command(label='リセット', command=self.reset)
        self.filemenu.add_separator()
        self.filemenu.add_command(label='終了', command=self.root.destroy)
        #menubar表示
        self.root.config(menu = self.menubar)

    def MyStyle(self, name, color):
        #style指定
        style = Style()
        style.configure(name, background=color)

    def btn_click_left(self, _x, _y):
        """マス（ボタン）を左クリックした場合"""
        def  f():
            if(self.color_change=="#ff0000"):
                self.bomb_judge(_x, _y)
            else:
                if(self.MASS[_y][_x] == "FLAG"):
                    self.MASS[_y][_x] = "NONE"
                else:
                    self.MASS[_y][_x] = "FLAG"
            self.draw()

        return f

    def bomb_set(self):
        """マスと爆弾の設定"""
        self.BOMB_MASS = [["NONE"] * self.WIDTH_MASS for i in range(self.HEIGHT_MASS)]
        self.MASS = [["NONE"] * self.WIDTH_MASS for i in range(self.HEIGHT_MASS)]
        for _i in random.sample(range(self.WIDTH_MASS*self.HEIGHT_MASS), k=int(self.BOMB_NUM)):
            _int = _i//self.WIDTH_MASS
            _deci = _i%self.WIDTH_MASS
            self.BOMB_MASS[_int][_deci] = "BOMB"
        for _i in range(self.HEIGHT_MASS):
            for _j in range(self.WIDTH_MASS):
                if(self.BOMB_MASS[_i][_j]=="NONE"):
                    _num = 0
                    for _k in range(-1,2):
                        if((_i+_k)<0 or (_i+_k)>self.HEIGHT_MASS-1):
                            continue
                        for _l in range(-1,2):
                            if((_j+_l)<0 or (_j+_l)>self.WIDTH_MASS-1):
                                continue
                            #print(_i+_k, _j+_l)
                            if(self.BOMB_MASS[_i+_k][_j+_l]=="BOMB"):
                                _num = _num + 1
                    self.BOMB_MASS[_i][_j] = _num

    def bomb_judge(self, _x, _y):
        if(self.MASS[_y][_x] == "NONE"):
            if(self.BOMB_MASS[_y][_x] != 0):
                self.MASS[_y][_x] = self.BOMB_MASS[_y][_x]
                if(self.MASS[_y][_x] == "BOMB"):
                    messagebox.showinfo(title='Minesweeper', message='ゲームオーバー')
                    self.reset()
                    
            else:
                self.MASS[_y][_x] = self.BOMB_MASS[_y][_x]

                if(_x-1>=0): self.bomb_judge(_x-1, _y)
                if(_x+1<self.WIDTH_MASS): self.bomb_judge(_x+1, _y)
                if(_y-1>=0): self.bomb_judge(_x, _y-1)
                if(_y+1<self.HEIGHT_MASS): self.bomb_judge(_x, _y+1)

    def flag_btn_click(self):
        def f():
            if(self.color_change == "#00ff00"):
                self.color_change = "#ff0000"
            else:
                self.color_change = "#00ff00"
            self.MyStyle("F.TButton", self.color_change)
        return f

    def arrange(self):
        """ウィジェット作成＆配置"""
        self.MyStyle("G.TFrame", "#999999")
        #ウィジェット作成
        self.frame1 = Frame(
            self.root,
            style = "G.TFrame",
            relief = "sunken",
        )

        self.timer_text = StringVar()

        style = Style()
        style.configure("B.TLabel", background="#000000", foreground="#ffffff")
        self.label_counter = Label(
            self.frame1,
            style = "B.TLabel",
            textvariable = self.timer_text,
            font = ("",20),
            padding = "5 0 0 0"
        )

        self.color_change = "#ff0000"
        self.MyStyle("F.TButton", self.color_change)
        self.flag_button = Button(
            self.frame1,
            style = "F.TButton",
            state = NORMAL,
            command = self.flag_btn_click()
        )

        self.frame2 = Frame(
            self.root,
            style = "G.TLabel",
            relief = "sunken",
        )

        self.mass = []
        for _y in range(20):
            self.mass.append([])
            for _x in range(30):
                self.mass[_y].append(Button(self.frame2, text="", command=self.btn_click_left(_x, _y)))

    def draw(self):
        """描画"""
        self.frame1.place(x=0, y=0, width=self.WIDTH_MASS*30, height=60)
        self.label_counter.place(x=5, y=5, width=100, height=50)
        self.flag_button.place(x=self.WIDTH_MASS*30/2-30, y=5, width=60, height=50)
        self.frame2.place(x=0, y=60, relwidth=self.WIDTH_MASS*30, height=self.HEIGHT_MASS*30)       
        self.MyStyle("BOMB.TFrame", "#FF0000")
        for _i in range(self.HEIGHT_MASS):
            for _j in range(self.WIDTH_MASS):
                if(self.MASS[_i][_j] == "NONE"):
                    self.mass[_i][_j] = Button(self.frame2, text="", command=self.btn_click_left(_j, _i))
                    self.mass[_i][_j].place(x=_j*30, y=_i*30, width=30, height=30)
                elif(self.MASS[_i][_j] == "FLAG"):
                    self.MyStyle("BG.TButton", "#00ff00")
                    self.mass[_i][_j] = Button(self.frame2, text="", style = "BG.TButton", command=self.btn_click_left(_j, _i))
                    self.mass[_i][_j].place(x=_j*30, y=_i*30, width=30, height=30)
                else:
                    if(self.BOMB_MASS[_i][_j] == "BOMB"):
                        self.mass[_i][_j] = Label(self.frame2, style = "BOMB.TFrame")
                        self.mass[_i][_j].place(x=_j*30, y=_i*30, width=30, height=30)
                    else:
                        self.mass[_i][_j] = Label(self.frame2,font=("",20), text="" if self.BOMB_MASS[_i][_j]==0 else str(self.BOMB_MASS[_i][_j]), padding="6 0 0 0")
                        self.mass[_i][_j].place(x=_j*30, y=_i*30, width=30, height=30)
        
        self.timer_text.set("????")
        _num = 0
        for _i in range(self.HEIGHT_MASS):
            for _j in range(self.WIDTH_MASS):
                if(self.MASS[_i][_j] == "NONE" or self.MASS[_i][_j] == "FLAG"):
                    _num += 1
        if(_num == self.BOMB_NUM): 
            self.timer_text.set(str(int(round(time.time()-self.start, 0)))+"秒")
            messagebox.showinfo(title='Minesweeper', message='ゲームクリアー')
            self.reset()

    def __init__(self):
        self.window_setup()
        self.menu_setup()
        self.arrange()
        self.BOMB_NUM = 0.1*self.WIDTH_MASS*self.HEIGHT_MASS
        self.reset()
        self.root.mainloop()
        

if __name__ == "__main__":
    Minesweeper()