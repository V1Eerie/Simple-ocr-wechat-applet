// app.js
App({
    data: {
        jf: wx.getStorageSync('jf') || 10,
        qd: true
    },
    onLaunch() {
        var oldDate = wx.getStorageSync('date')
        var now = new Date();
        if (oldDate) {
            var isSameDay = now.toDateString() === new Date(oldDate).toDateString();
            this.data.qd = !isSameDay;
        } else {
            this.data.qd = true
        }
    }
})