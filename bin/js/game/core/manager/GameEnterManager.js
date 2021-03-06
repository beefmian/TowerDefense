/*
* Manager初始化类
*/
class GameEnterManager {
    init() {
        LanguageManager.Instance.init();
        ViewRegisterMgr.Instance.initRegisterView();
        HallManager.Instance.setup();
        PlayerManager.Instance.setup();
        BattleManager.Instance.setup();
    }
    static get Instance() {
        if (!GameEnterManager._instance) {
            GameEnterManager._instance = new GameEnterManager();
        }
        return GameEnterManager._instance;
    }
}
//# sourceMappingURL=GameEnterManager.js.map