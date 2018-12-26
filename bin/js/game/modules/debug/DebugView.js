class DebugView extends Laya.View {
    constructor() {
        super();
        this.mouseThrough = true;
        this.ui = new ui.common.view.DebugViewUI();
        this.addChild(this.ui);
        this._switches = [];
        Laya.Browser.onFreeman && (this._switches.push("onFreeman"));
        Laya.Browser.onDavid && (this._switches.push("onDavid"));
        Laya.Browser.onSong && (this._switches.push("onSong"));
        Laya.Browser.onMing && (this._switches.push("onMing"));
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
            EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: userData.gold = 0 });
        });
        this.ui.btnAddGold.on(Laya.Event.CLICK, this, () => {
            EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: userData.gold += (userData.gold * 2) + 1e100 });
        });
        this.ui.btnAddDiamond.on(Laya.Event.CLICK, this, () => {
            EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond += 1000 });
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
    hide() {
    }
}
//# sourceMappingURL=DebugView.js.map