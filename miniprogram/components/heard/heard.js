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
        userInfo: wx.getStorageSync('use_info'),
        use_list: {
            avatarUrl: wx.getStorageSync('use_list').avatarUrl || '../../images/user-unlogin.png'
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goToUserInfo() {
            wx.navigateTo({
                url: '/pages/user_list/user_list'
            })
        },
        getUserProfile() {
            let _this = this;
            let openid = wx.getStorageSync('openid');
            if (openid) {
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
                            let user_id = res.data.id;
                            wx.setStorageSync('use_info', {
                                image: avatarUrl,
                                name: nickName,
                                openid,
                                id: user_id
                            });
                            _this.setData({
                                userInfo: wx.getStorageSync('use_info')
                            })
                            _this.triggerEvent("getBookList", user_id)
                        }).catch(err => {})
                        _this.setData({
                            use_list: res.userInfo
                        })
                    }
                })
            } else {
                wx.showToast({
                    title: '请重新加载小程序~~',
                    icon: 'error',
                })
            }
        },
    }
})