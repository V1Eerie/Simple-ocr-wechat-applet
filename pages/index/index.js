var app = getApp();
Page({
    data: {
        jf: app.data.jf,
        src: "/images/index.png",
        flag: true,
        show: false,
        str: "",
        loading: false,
        type: "primary"
    },
    chooiseimg() {
        let that = this;
        wx.chooseMedia({
            count: 1,
            sizeType: ['compressed'],
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success(res) {
                that.setData({
                    src: res.tempFiles[0].tempFilePath,
                    flag: false,
                    loading: false,
                    type: "primary"
                })
            }
        })
    },
    async sendOcrRequest(imgString) {
        const response = await new Promise((resolve, reject) => {
            wx.request({
                url: "https://ocr.implementsfreedom.tech/api/v1/ocr",
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    ImgString: "data:image/jpeg;base64," + imgString
                },
                enableHttp2: true,
                enableQuic: true,
                success: resolve,
                fail: reject
            })
        });
        const data = response.data;
        return data;
    },
    imgBase64(img_url) {
        return wx.getFileSystemManager().readFileSync(img_url, 'base64')
    },
    async OcrStart() {
        let that = this;
        that.setData({
            loading: true,
            type: "default"
        })
        if (app.data.jf <= 0) {
            wx.showToast({
                title: '积分不足',
                icon: 'none',
            })
        } else {
            app.data.jf -= 1
            that.setData({
                jf: app.data.jf
            })
            const res = await this.sendOcrRequest(this.imgBase64(this.data.src));
            if (res.code == "success") {
                that.setData({
                    str: res.text,
                    show: true,
                    loading: false,
                    type: "primary"
                });
            } else {
                app.data.jf += 1
                that.setData({
                    str: "请求失败，请再试一次",
                    show: true,
                    loading: false,
                    type: "primary"
                });
            }
            wx.setStorageSync('jf', app.data.jf)
        }
    }
})