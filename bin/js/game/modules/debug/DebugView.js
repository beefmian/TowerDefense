class DebugView extends Laya.View {
    constructor() {
        super();
        this._daddy = 0;
        this.mouseThrough = true;
        this.ui = new ui.common.view.DebugViewUI();
        this.addChild(this.ui);
        this._switches = [];
        Laya.Browser.onFreeman && (this._switches.push("onFreeman"), this.callDaddy());
        Laya.Browser.onDavid && (this._switches.push("onDavid"), this.callDaddy());
        Laya.Browser.onSong && (this._switches.push("onSong"), this.callDaddy());
        Laya.Browser.onMing && (this._switches.push("onMing"), this.callDaddy());
        this.ui.btnLow.on(Laya.Event.CLICK, this, () => {
            Laya.timer.clear(this, this.callDaddy);
            Laya.timer.once(5e3, this, this.offDaddy);
            this._daddy++;
            console.log("@FREEMAN: 爸爸等于：", this._daddy);
            if (this._daddy > 5) {
                this.offDaddy();
            }
        });
        this.ui.btnHigh.on(Laya.Event.CLICK, this, () => {
            Laya.timer.clear(this, this.callDaddy);
            Laya.timer.once(5e3, this, this.offDaddy);
            if (this._daddy === 5 || this._daddy === 6) {
                this._daddy++;
                console.log("@FREEMAN: 爸爸等于：", this._daddy);
            }
            if (this._daddy === 7) {
                Laya.timer.clear(this, this.offDaddy);
                this.callDaddy();
            }
        });
        Laya.timer.once(3000, this, () => {
            this.ui.btnUid.label = "UID: " + userData.userId;
        });
        this.ui.btnUid.on(Laya.Event.CLICK, this, () => {
            this.ui.btnUid.label = "UID: " + userData.userId;
            console.log("@FREEMAN: UserData =>", userData);
            HttpManager.Instance.requestUserinfoData(null);
        });
        let b = 0;
        this.ui.btnShowStats.on(Laya.Event.CLICK, this, () => {
            b ^= 1;
            b && Laya.Stat.show(LayerManager.left, LayerManager.top);
            !b && Laya.Stat.hide();
        });
        this.ui.btnCompleteNovice.on(Laya.Event.CLICK, this, () => {
            M.novice.complete();
        });
        this.ui.btnResetKingLevel.on(Laya.Event.CLICK, this, () => {
            DebugView.GameView.setKingLevel(1);
        });
        this.ui.btnResetGold.on(Laya.Event.CLICK, this, () => {
            EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney = 0 });
        });
        this.ui.btnAddGold.on(Laya.Event.CLICK, this, () => {
            EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney += (M.player.Info.userMoney * 2) + 1e100 });
        });
        this.ui.btnAddDiamond.on(Laya.Event.CLICK, this, () => {
            EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond += 1000 });
        });
        this.ui.btnCrearStorage.on(Laya.Event.CLICK, this, () => {
            userData.clearLocalData();
            Laya.stage.renderingEnabled = false;
            Laya.timer.clearAll(DebugView.GameView);
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.wx.exitMiniProgram();
            }
        });
        this.ui.btnExitGame.on(Laya.Event.CLICK, this, () => {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.wx.exitMiniProgram();
            }
        });
        this.ui.viewStackArrow.selectedIndex = 0;
        this.ui.viewStackArrow._childs.forEach((child, index, children) => {
            child.on(Laya.Event.CLICK, this, () => {
                this._switches.map((key) => {
                    Laya.Browser[key] = !Laya.Browser[key];
                });
                this.ui.viewStackArrow.selectedIndex ^= 1;
                Laya.Tween.clearAll(this.ui.viewBtnContainer);
                if (this.ui.viewStackArrow.selectedIndex) {
                    Laya.Tween.to(this.ui.viewBtnContainer, { x: 180 }, 500, Laya.Ease.quadOut);
                }
                else {
                    Laya.Tween.to(this.ui.viewBtnContainer, { x: 0 }, 500, Laya.Ease.quadOut);
                }
            });
        });
    }
    callDaddy() {
        this._daddy = 0;
        GlobalConfig.daddy = this.ui.viewStackArrow.selectedIndex === 0;
        this.ui.viewBtnContainer.visible = this.ui.viewStackArrow.visible = true;
        console.log("@FREEMAN: 呼叫爸爸");
    }
    offDaddy() {
        this._daddy = 0;
        Laya.Stat.hide();
        GlobalConfig.daddy = this.ui.viewBtnContainer.visible = this.ui.viewStackArrow.visible = false;
        console.log("@FREEMAN: 关闭爸爸");
    }
}
//# sourceMappingURL=DebugView.js.map