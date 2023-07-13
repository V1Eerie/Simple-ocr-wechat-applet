var app = getApp();
// 创建激励视频广告组件
let rewardedVideoAd = wx.createRewardedVideoAd({
    adUnitId: 'adunit-5266635b7140e545'
});
rewardedVideoAd.onLoad(() => {
    console.log('激励视频广告加载成功');
});
rewardedVideoAd.onError((err) => {
    console.log('激励视频广告错误', err);
});
rewardedVideoAd.onClose((res) => {
    if (res && res.isEnded || res === undefined) {
        // 增加用户积分
        app.data.jf += 10;
        this.setData({
            jf: app.data.jf,
        })
        wx.setStorageSync('jf', app.data.jf)
        console.log('用户观看完激励视频，增加10积分');
    } else {
        console.log('用户未观看完激励视频');
    }
});

Page({
    data: {
        text: "点击签到",
        jf: app.data.jf,
        qd: app.data.qd,
        show: false,
        barHeight: 20, //  顶部状态栏高度
        navBarHeight: 66, // 顶部高度
        tabList: [{
                id: '1',
                src: '/images/vip.png',
                title: '会员中心'
            },
            {
                id: '2',
                src: '/images/menu2.png',
                title: '看广告'
            },
            {
                id: '3',
                src: '/images/menu3.png',
                title: '看广告2'
            }
        ],
    },
    // 头像监听
    headClick() {
        wx.showToast({
            title: '点击了头像',
            icon: 'none'
        })
        wx.navigateTo({
            url: '需要跳转的链接路径',
        })
    },
    // 查看详情监听
    detailClick() {
        if (this.data.qd) {
            app.data.jf += 1
            this.setData({
                jf: app.data.jf,
                text: '签到过了',
                qd: false
            })
            app.data.qd = false
            wx.showToast({
                title: '签到成功',
                icon: 'none',
            })
            wx.setStorageSync('jf', app.data.jf)
            wx.setStorageSync('date', new Date())
        } else(
            wx.showToast({
                title: '签到过了',
                icon: 'none',
            }))
    },
    // 更多实例
    shareClick() {
        wx.showToast({
            title: '分享更多示例',
            icon: 'none'
        })
        wx.navigateTo({
            url: '需要跳转的链接路径',
        })
    },
    // 二级菜单监听
    tabClick(e) {
        var info = e.currentTarget.dataset.item;
        switch (info.id) {
            case '2':
                wx.showModal({
                    title: '观看激励视频',
                    content: '观看激励视频可以获得10积分，是否观看？',
                    success: (res) => {
                        if (res.confirm) {
                            // 播放激励视频广告
                            rewardedVideoAd.show().catch((err) => {
                                // 激励视频广告播放出错，增加异常处理
                                console.log('激励视频广告播放出错', err);
                                wx.showToast({
                                    title: '激励视频广告播放出错，请稍后重试',
                                    icon: 'none'
                                });
                            });
                        }
                    }
                });
                break;
            case '3':
                wx.navigateTo({
                    url: '/pages/video/video',
                })
                app.data.jf += 10;
                this.setData({
                    jf: app.data.jf,
                })
                wx.setStorageSync('jf', app.data.jf)
                console.log('用户观看完激励视频，增加10积分');
                break;
            default:
                break;
        }
    },
    // 基本信息
    basicClick() {
        wx.showToast({
            title: '基本信息监听',
            icon: 'none'
        })
        wx.navigateTo({
            url: '需要跳转的链接路径',
        })
    },
    // 匿名反馈
    feedbackClick() {
        wx.showToast({
            title: '匿名反馈监听',
            icon: 'none'
        })
        wx.navigateTo({
            url: '需要跳转的链接路径',
        })
    },
    // 页面滚动监听
    onPageScroll(e) {
        if (e.scrollTop > 60) {
            this.setData({
                show: true
            })
        } else {
            this.setData({
                show: false
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        if (!this.data.qd) {
            this.setData({
                text: '签到过了'
            })
        }
        var that = this;
        // 胶囊信息
        var menu = wx.getMenuButtonBoundingClientRect();
        wx.getSystemInfo({
            success(res) {
                that.setData({
                    barHeight: res.statusBarHeight,
                    navBarHeight: menu.top + menu.height
                })
            }
        })
    },
    onShow() {
        this.setData({
            jf: app.data.jf,
        })
    }
})