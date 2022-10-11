// const host = 'http://127.0.0.1:3002/';
const host = 'https://book.ihuzb.cn/';
export default (url, method, data) => {
    return new Promise((re, rj) => {
        wx.request({
            url: `${host}${url}`,
            method,
            data,
            success: res => {
                if (res.data.state == 200) {
                    re(res.data)
                } else {
                    rj(res.data)
                }
            },
            fail: err => {
                rj(err)
            }
        })
    })
}