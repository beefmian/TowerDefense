/*
* name;
*/
class HttpManager {
    constructor() {

    }

    /** 请求通关奖励 */
    public requestStagePrizeDiamond(_stage: number, _diamond: number, _essence: number, _callback: any): void {
        let that = this;
        let dataString = 'stage=' + _stage + '&diamond=' + _diamond + '&essence=' + _essence;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/stage/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestStagePrizeDiamond", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求奖励未领取的关卡 */
    public requestStagePrizeData(_callback: any = null): void {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/stage/get/info',
            success: function (res) {
                console.log("requestStagePrizeData:", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 钻石购怪物 */
    public requestDiamondBuy(_order_id: number, _callback: any): void {
        console.log("钻石购怪物", _order_id);
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/buy_car/' + _order_id,
            success: function (res) {
                console.log("requestDiamondBuy", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 请求等级奖励钻石 */
    public requestLevelPrizeDiamond(_level: number, _diamond: number, _callback: any): void {
        let that = this;
        let dataString = 'level=' + _level + '&diamond=' + _diamond;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/upgrade_reward_diamond',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestLevelPrizeDiamond", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 钻石购怪物下单 */
    public requestDiamondBuyOrder(_diamond: number, _callback: any, _kind: number = 0): void {
        console.log("钻石购怪物订单", _diamond);
        let that = this;
        let strKind: string = 'buy_car';
        if (_kind == 1) {
            strKind = 'diamond_acce';
        }
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/order/' + _diamond + '/' + strKind,
            success: function (res) {
                console.log("requestDiamondBuyOrder", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }


    /** 请求钻石升级 */
    public requestUpdateKingLevel(_id: number, _level: number, _price: number, _callback: any = null): void {
        let that = this;
        let dataString = 'type=' + _id + '&value=' + _level + '&price=' + _price + '&unit=' + "diamond";
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestUpdateKingLevel", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 每日任务 */
    public requestDailyTaskData(_taskId: number): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/progress/' + _taskId,
            success: function (res) {
                console.log("requestDailyTaskData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 新老版本清理回调 */
    public requestVersionClear(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/clear/user_data',
            success: function (res) {
                console.log("requestVersionClear", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 新老版本更新检测（防止老数据覆盖） */
    public requestVersionCheck(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/check/version',
            success: function (res) {
                console.log("requestVersionCheck", res);
                if (res && res.clear_flag) {
                    //清理老数据
                    // that.clearLocalData();
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 分享广告完成 */
    public requestShareAdFinish(_kind: string, shareId: number = 0): void {
        let that = this;
        let dataString = 'type=' + _kind + '&share_id=' + shareId;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/post_info',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 分享完成 */
    public requestShareFinish(_shareId: number, _encryptedData: string = '', _iv: string = '', _callback: any = null): void {
        let that = this;
        let dataString = 'share_id=' + _shareId + '&encryptedData=' + _encryptedData + '&iv=' + _iv;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/finish',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 获取分享主题 */
    public requestShareSubject(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/to',
            success: function (res) {
                console.log(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 通知服务器已领取离线收益 */
    public requestNotifyServerPrize(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/reward',
            success: function (res) {
                console.log("requestNotifyServerPrize:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 技能强化 */
    public requestSkillAddtionData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/get/intensify',
            success: function (res) {
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    }

    /** 英雄商店数据 */
    public requestCarshopData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/get',
            success: function (res) {
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    }

    /** 用户精华碎片 */
    public requestEssenceData(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_essence',
            success: function (res) {
                if (res) {
                    userData.essence = MathUtils.parseStringNum(res.essence);
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.ESSENCE_CHANGE, res);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 用户钻石 */
    public requestDiamondData(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_diamond',
            success: function (res) {
                if (res) {
                    userData.diamond = MathUtils.parseStringNum(res.diamond);
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, res);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 坑位数据 */
    public requestCarparkData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/get',
            success: function (res) {
                console.log("requestCarparkData:", res);
                if (res) {
                    for (var key in userData.parkcarInfoArray) {
                        if (userData.parkcarInfoArray.hasOwnProperty(key)) {
                            var element = res[key];
                            if (element) {
                                userData.parkcarInfoArray[key] = element;
                            }
                        }
                    }
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    }

    /** 分享/广告可点击次数(广告->ad; 分享免费得车->free_car; 买车金币不足得金币->no_money; 加速->acce;) */
    public requestShareAdTimes(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/get_num',
            success: function (res) {
                userData.shareAdTimes = res;
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 用户信息金币 */
    public requestUserinfoData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get',
            success: function (res) {
                console.log("requestUserinfoData:", res);
                if (res) {
                    userData.gold = MathUtils.parseStringNum(res.money);
                    console.log("获取服务器发送过来金币数量：" + userData.gold);
                    userData.carLevel = MathUtils.parseInt(res.car_level);
                    userData.level = MathUtils.parseInt(res.level);
                    userData.diamond = MathUtils.parseStringNum(res.diamond);
                    if (res.hasOwnProperty("essence")) {
                        userData.essence = MathUtils.parseInt(res.essence);
                    }
                    if (res.hasOwnProperty("stage")) {
                        userData.passStage = MathUtils.parseInt(res.stage);
                    }
                    if (res.hasOwnProperty("king_level")) {
                        userData.kingLevel = MathUtils.parseStringNum(res.king_level);
                    }
                    if (res.hasOwnProperty("evolution_level")) {
                        userData.evolutionLevel = MathUtils.parseStringNum(res.evolution_level);
                    }
                    if (res.tutorial) {
                        userData.noviceGroupId = parseInt(res.tutorial);
                    }
                    userData.userId = res.id;
                    console.log("@FREEMAN: UserId = {" + userData.userId + "}");
                    EventsManager.Instance.event(EventsType.UPDATE_HALL_DATA);
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    }

    /** 提交用户名称位置等信息 */
    public requestSaveWxUserinfoData(_nickName: string, _avatarUrl: string, _city: string, _gender: number): void {
        let that = this;
        let dataString = 'nickName=' + _nickName + '&avatarUrl=' + _avatarUrl + '&city=' + _city + '&gender=' + _gender;
        console.log("requestSaveWxUserinfoData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/update',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveWxUserinfoData2", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 强化数据 */
    public requestSaveSkillAdditionData(): void {
        let dataJson = JSON.stringify(userData.skillAdditionArray);
        let dataString = 'info=' + dataJson;
        console.log("requestSaveSkillAdditionData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/update/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveSkillAdditionData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 用户信息金币 */
    public requestSaveUserinfoData(): void {
        let that = this;
        let dataString = 'money=' + userData.gold + '&car_level=' + userData.carLevel;
        dataString += '&stage=' + userData.getPassStage();
        dataString += '&king_level=' + userData.getKingLevel();
        console.log("requestSaveUserinfoData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveUserinfoData2", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 保存坑位数据 */
    public requestSaveCarparkData(): void {
        let that = this;
        let dataJson = JSON.stringify(userData.parkcarInfoArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.parkcarInfoArray.length < 1 || userData.carparkJsonRecord == dataJson) {
            return;
        }
        userData.carparkJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveCarparkData2:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 保存英雄商店数据 */
    public requestSaveCarshopData(): void {
        let that = this;
        let dataJson = JSON.stringify(userData.carBuyRecordArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.carBuyRecordArray.length < 1 || userData.carshopJsonRecord == dataJson) {
            return;
        }
        userData.carshopJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveCarshopData2:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 分享标志 */
    public requestShareFlag(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                console.log("requestShareFlag", res);
                userData.shareSwitchOpen = res;
                if (EventsManager.Instance) {
                    EventsManager.Instance.event(EventsType.SHARE_SWITCH, res);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }


    private static _instance: HttpManager;
    public static get Instance(): HttpManager {
        if (HttpManager._instance == null) {
            HttpManager._instance = new HttpManager();
        }
        return HttpManager._instance;
    }
}