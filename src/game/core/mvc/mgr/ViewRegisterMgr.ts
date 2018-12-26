
class ViewRegisterMgr {

    /** 初始化注册界面 */
    public initRegisterView(): void {
        ViewMgr.Ins.register(ViewConst.FollowRewardView, new FollowRewardView());
        ViewMgr.Ins.register(ViewConst.StrengthenView, new StrengthenView());
        ViewMgr.Ins.register(ViewConst.RewardGoldView, new RewardGoldView());
        ViewMgr.Ins.register(ViewConst.FriendConcurView, new FriendConcurView());
    }

    private static _instance: ViewRegisterMgr;
    public static get Instance(): ViewRegisterMgr {
        if (!ViewRegisterMgr._instance) {
            ViewRegisterMgr._instance = new ViewRegisterMgr();
        }
        return ViewRegisterMgr._instance;
    }
}