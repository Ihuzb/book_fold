// components/heard/heard.js
import request from "../../api/request";

Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        use_list: {
            avatarUrl: wx.getStorageSync('use_list').avatarUrl || '../../images/user-unlogin.png'
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserProfile() {
            let _this = this;
            let openid = wx.getStorageSync('openid');
            wx.getUserProfile({
                desc: '展示用户信息',
                success: (res) => {
                    let {
                        avatarUrl,
                        nickName
                    } = res.userInfo;
                    wx.setStorageSync('use_list', res.userInfo);
                    request('insertUserList', 'POST', {
                        user_name: nickName,
                        user_img: avatarUrl,
                        user_openid: openid,
                    }).then(res => {
                        console.log(res, 333);
                        let user_id = res.data.id;
                        wx.setStorageSync('use_info', {
                            image: avatarUrl,
                            name: nickName,
                            openid,
                            id: user_id
                        });
                        _this.triggerEvent("getBookList", user_id)
                    }).catch(err => {})
                    _this.setData({
                        use_list: res.userInfo
                    })
                }
            })
        },
    }
})