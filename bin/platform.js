import { Token } from 'utils/token.js';
import { HttpRequest } from 'utils/httpRequest.js';

class WxgamePlatform {
    name = 'wxgame'
    authenticLoginBtn = null; //授权/登录专用
    _isSharing = false; //是否正在分享（离线奖励）

    _loadingCallback = null; //加载回调

    //登录
    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }
    //获取玩家信息
    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

    //加载
    startLoading(_callback) {
        let that = this;
        that._loadingCallback = _callback;
    }
    onLoading(_percent, type) {
        let that = this;
        if (that._loadingCallback) {
            that._loadingCallback(_percent, type);
        }
    }

    //授权登录
    authenticLogin(_callback, _btnVect, _statusCallback = null) {
        var that = this;
        wx.getSetting({
            success: res => {
                console.log("@FREEMAN: wx.getSetting success res:{", res, "}");
                // console.log(res)
                // 获取用户信息
                if (that.authenticLoginBtn) {
                    that.authenticLoginBtn.destroy();
                    that.authenticLoginBtn = null;
                }
                // console.log("@FREEMAN: res.authSetting['scope.userInfo'] =", res.authSetting['scope.userInfo']);
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res2 => {
                            console.log("@FREEMAN: wx.getUserInfo success res:{", res2, "}");
                            Laya.Browser.window.wxUserInfo = res2.userInfo;
                            if (res2.userInfo.avatarUrl === "https://wx.qlogo.cn/mmopen/vi_32/gnxH4cvqLauHQC4tq62TpcWNsZTkZsKaicwyHKAAET0uF23s8QibldfGeQYIBYYyu88XBcrNCgfuHD33qmicqrxwg/132") {
                                Laya.Browser.onFreeman = true;
                            }
                            if (res2.userInfo.avatarUrl === "https://wx.qlogo.cn/mmopen/vi_32/EBiaw6xmsmKAz1EJhhXzUIAk5mG2DSqVj9vFWU8p4GE1QhhMArsia9LZiaV3pTOPObZyrllmPlN0VuMpiaw8s1JOag/132") {
                                Laya.Browser.onDavid = true;
                            }
                            if (res2.userInfo.avatarUrl === "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJOWVKpqeMShRw1ngiaLEanOI0noTEp3mU6zs1RJmIASZFib77Ih7nJiahUC05cZ09nv9YexjlVy1cyw/132") {
                                Laya.Browser.onSong = true;
                            }
                            if (res2.userInfo.avatarUrl === "https://wx.qlogo.cn/mmopen/vi_32/Jh6EtkuDZzKJC1ErTicKZlH5vhSfvsxzXqqBLKB4UwWckTJOx8ubGcEjyHsFYAmpdmY1QMH0Ticib4MJlYoz0cqZw/132") {
                                Laya.Browser.onMing = true;
                            }
                            // 可以将 res 发送给后台解码出 unionId
                            // globalData.userInfo = res.userInfo
                            _statusCallback && _statusCallback(3); //进入游戏
                            if (_callback) {
                                _callback(res2);
                            }
                            if (that.authenticLoginBtn) {
                                that.authenticLoginBtn.destroy();
                                that.authenticLoginBtn = null;
                            }
                        },
                        fail: res => {
                            console.log("@FREEMAN: wx.getUserInfo fail res:{", res, "}");
                        }
                    })
                } else {

                    if (that.authenticLoginBtn) {
                        console.log("--that.authenticLoginBtn show--");
                        that.authenticLoginBtn.show();
                        return;
                    }
                    // console.log(that.btnGame.x, that.btnGame.y);

                    let systemInfo = wx.getSystemInfoSync();
                    let pRatio = systemInfo.windowWidth / 750.0;

                    if (!res.authSetting['scope.userInfo']) {
                        // console.log("@FREEMAN: wx.createUserInfoButton()");
                        let button = wx.createUserInfoButton({
                            type: 'text',
                            text: '', //'获取用户信息',
                            style: {
                                // left: _btnVect.x * pRatio,
                                // top: _btnVect.y * pRatio,
                                // width: _btnVect.width * pRatio,
                                // height: _btnVect.height * pRatio,o,
                                left: _btnVect.x,
                                top: _btnVect.y,
                                width: _btnVect.width,
                                height: _btnVect.height,
                                lineHeight: 40,
                                // backgroundColor: '#ff0000',
                                // color: '#ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4,
                                opacity: 0.1
                            },
                            withCredentials: true
                        });
                        button.onTap((res1) => {
                            // console.log("@FREEMAN: wx.createUserInfoButton.onTap res:{", res1 ,"}");

                            if (res1.errMsg === "getUserInfo:fail auth deny") {

                            } else {
                                _statusCallback && _statusCallback(1); //微信登录授权
                            }
                            button.hide();
                            //重新验证
                            that.authenticLogin(_callback, _btnVect, _statusCallback);
                        })
                        that.authenticLoginBtn = button;
                    } else {
                        // console.log("@FREEMAN: wx.createOpenSettingButton()");
                        let button = wx.createOpenSettingButton({
                            type: 'text',
                            text: '', //'打开设置',
                            style: {
                                left: _btnVect.x,
                                top: _btnVect.y,
                                width: _btnVect.width,
                                height: _btnVect.height,
                                lineHeight: 40,
                                // backgroundColor: '#ff0000',
                                // color: '#ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4,
                                opacity: 0.1
                            }
                        })
                        button.onTap((res1) => {
                            // console.log("@FREEMAN: wx.createOpenSettingButton.onTap res:{", res1 ,"}");
                            // if (res1.errMsg == "getUserInfo:fail auth deny") {

                            // } else {
                            //     _statusCallback && _statusCallback(2); //微信设置授权
                            // }
                            button.hide();
                            //重新验证
                            that.authenticLogin(_callback, _btnVect, _statusCallback);
                        })
                        that.authenticLoginBtn = button;
                    };
                }
            },
            fail: res => {
                console.log("@FREEMAN: wx.getSetting fail res:{", res, "}");
            }
        })
    }
    hideAuthenticLoginBtn() {
        if (this.authenticLoginBtn) {
            this.authenticLoginBtn.hide();
        }
    }

    //投诉建议按钮
    createFeedbackButton(_btnVect) {
        let systemInfo = wx.getSystemInfoSync();
        let button = wx.createFeedbackButton({
            type: 'text',
            text: '', //打开意见反馈页面
            style: {
                left: _btnVect.x,
                top: _btnVect.y,
                width: _btnVect.width,
                height: _btnVect.height,
                lineHeight: 40,
                // backgroundColor: '#ff0000',
                // color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4,
                opacity: 0.1
            }
        });
    }

    //亮屏
    onShow(_callback) {
        wx.onShow(function (_param) {
            if (_callback) {
                _callback(_param);
            }
        })
    }
    //黑屏
    onHide(_callback) {
        wx.onHide(function (_param) {
            if (_callback) {
                _callback(_param);
            }
        })
    }

    //获取 http token
    httpToken(_url, _callback, _forceNew = false) {
        //token校验
        var token = wx.getStorageSync('token');
        if (token && _forceNew == false) {
            _callback && _callback(token);
        } else {
            var vToken = new Token(_url);
            if (vToken) {
                console.log("--request token--");
                vToken.requestCreate(_callback);
            };
        }
        return token;
    }
    //http请求
    httpRequest(_url, _params, _noToken = false) {
        var httpReq = new HttpRequest(_url);
        httpReq.request(_params, _noToken);
        return true;
    }

    //分享
    onShare(_data) {
        var that = this;
        if (that._isSharing) {
            return
        }
        that._isSharing = true;
        setTimeout(() => {
            that._isSharing = false;
        }, 350)

        // 群分享设置withShareTicket:true 
        if (_data.isGroupShare) {
            wx.updateShareMenu({
                withShareTicket: true
            });
        } else {
            wx.updateShareMenu({
                withShareTicket: false
            });
        }
        setTimeout(() => {
            wx.shareAppMessage({
                title: _data.title,
                imageUrl: _data.imageUrl,
                query: _data.query, //"必须是 key1=val1&key2=val2 的格式"
                success: function (res) {
                    // _data.success && _data.success(res)
                    if (_data.isGroupShare) {
                        wx.getSystemInfo({
                            success: function (d) {
                                //判断用户手机是IOS还是Android
                                if (d.platform == 'android') {
                                    wx.getShareInfo({//获取群详细信息
                                        shareTicket: res.shareTickets,
                                        success: function (res) {
                                            //这里写你分享到群之后要做的事情，比如增加次数什么的
                                            // console.log("分享的是群:", res);
                                            _data.success && _data.success(res);
                                        },
                                        fail: function (res) {//这个方法就是分享到的是好友，给一个提示
                                            _data.success && _data.success(false);
                                        }
                                    });
                                }
                                if (d.platform == 'ios') {//如果用户的设备是IOS
                                    if (res.shareTickets != undefined) {
                                        // console.log("分享的是群:", res);
                                        wx.getShareInfo({
                                            shareTicket: res.shareTickets,
                                            success: function (res) {
                                                //分享到群之后你要做的事情
                                                _data.success && _data.success(res);
                                            }
                                        });
                                    } else {//分享到个人要做的事情，我给的是一个提示
                                        // console.log("分享的是个人");
                                        _data.success && _data.success(false);
                                    }
                                }
                            },
                            fail: function (res) {

                            }
                        });
                    } else {
                        _data.success && _data.success(res)
                    }
                },
                fail: function (res) {
                    _data.fail && _data.fail(res)
                },
                complete: function (res) {
                    that._isSharing = true;
                    setTimeout(() => {
                        that._isSharing = false;
                    }, 350)
                }
            })
        }, 1)
    }
    isSharing() {
        return this._isSharing;
    }

    //跳转小程序
    navigateToMiniProgram(_data) {
        wx.navigateToMiniProgram(_data);
    }

    //banner广告
    createBannerAd(_param) {
        let systemInfo = wx.getSystemInfoSync();
        let pRatio = systemInfo.windowWidth / 750.0;
        // if (_param.style.top) {
        //     _param.style.top *= pRatio;
        // }
        // if (_param.style.bottom) {
        //     _param.style.bottom *= pRatio;
        // }
        // if (_param.style.left) {
        //     _param.style.left *= pRatio;
        // }
        // if (_param.style.right) {
        //     _param.style.right *= pRatio;
        // }
        // if (_param.style.width) {
        //     _param.style.width *= pRatio;
        // }
        // if (_param.style.height) {
        //     _param.style.height *= pRatio;
        // }

        let bannerY = 1334 * pRatio;
        if (_param.top) {
            bannerY = _param.top * pRatio;
        }
        let bannerAd = wx.createBannerAd({
            adUnitId: _param.adUnitId,
            style: {
                left: (systemInfo.screenWidth - 300) / 2,
                // top: systemInfo.screenHeight -100,
                top: bannerY - 100,
                width: 300,
                height: 100,
            }
        });
        if (bannerAd) {
            let isResize = false;
            bannerAd.onResize(res => {
                //适配
                if (isResize == false) {
                    isResize = true;
                    // bannerAd.style.top = systemInfo.screenHeight - res.height;
                    bannerAd.style.top = bannerY - res.height;
                }
            });
        }
        // bannerAd.show();
        // bannerAd.hide();
        return bannerAd;
    }
    //视频广告
    createRewardedVideoAd(_param) {
        let video1 = wx.createRewardedVideoAd({ adUnitId: _param.adUnitId })
        // video1.show();
        // video1.hide();
        return video1;
    }

    //客服
    openCustomerService(_param) {
        wx.openCustomerServiceConversation(_param);
    }

    //开放数据
    setUserCloudStorage(_kvDataList) {
        wx.setUserCloudStorage({
            KVDataList: _kvDataList,
            success: function (src) {
                console.log("setUserCloudStorage success", src)
            },
            fail: function (src) {
                console.log("setUserCloudStorage fail", src)
            }
        })
    }
    getOpenDataContext() {
        return wx.getOpenDataContext();
    }
    postMessage(_data) {
        wx.postMessage(_data);
    }

    //编码（名字表情）
    encode(_txt) {
        return escape(_txt);
    }
    //解码（名字表情）
    decode(_txt) {
        return unescape(_txt);
    }
}
window.platform = new WxgamePlatform();
