/*
* 通关获得奖励提示框;
*/
class ClearanceRewardView extends BaseView {

    constructor() {
        super(M.layer.subFrameLayer, ui.settlement.ClearanceRewardViewUI);
        this.setResources(["ClearanceReward"]);
    }

    //初始化
    public initData(): void {
        super.initData();
        let self = this;
        //关卡
        self.ui.txtStage.text = self.datas[0] + "";
        //当前奖励物品
        let stagePrizeCfg: any = GlobleData.getData(GlobleData.BarrierRewardVO, self.datas[0]);
        if (stagePrizeCfg == null) {
            return;
        }
        let bossM: number = MathUtils.parseStringNum(stagePrizeCfg.bossM);
        let gold: number = BattleManager.Instance.getBarrierRewardToGold(self.datas[0], MathUtils.parseStringNum(stagePrizeCfg.gold));
        gold = (self.datas[1] as boolean) == true ? gold * 2 : gold;
        let gem: number = MathUtils.parseStringNum(stagePrizeCfg.gem);
        let itemArray = [
            { img: "images/ClearanceReward/result_prize_item2.png", value: gold },
            { img: "images/ClearanceReward/result_prize_item3.png", value: gem },
            { img: "images/ClearanceReward/result_prize_item4.png", value: bossM }
        ];
        for (var index = 0, len: number = itemArray.length; index < len; index++) {
            let cfgData = itemArray[index];
            let rewardItem: RewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            rewardItem.create(cfgData.img, cfgData.value);
            rewardItem.x = index;
            self.ui.hbox.addChild(rewardItem);
        }
    }

    public addEvents(): void {
        super.addEvents();
        let self = this;
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        super.removeEvents();
        let self = this;
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onCloseHandler(): void {
        let self = this;
        let rewardItem: RewardItem = <RewardItem>self.ui.hbox.getChildAt(0);
        if (rewardItem) {
            let pos: Laya.Point = PointUtils.localToGlobal(rewardItem);
            LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", pos.x, pos.y));
        } else {
            LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
        }
        ViewMgr.Ins.close(ViewConst.ClearanceRewardView);
    }

    public close(...param: any[]): void {
        super.close(param);
        let self = this;
        DisplayUtils.removeAllChildren(self.ui.hbox);
    }
}