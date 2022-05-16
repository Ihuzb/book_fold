// components/heard/heard.js
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
          wx.cloud.callFunction({
            name: 'addUser',
            data: {
              image: avatarUrl,
              name: nickName,
              openid
            },
            complete: res => {
              console.log(res)
              let use_info = res.result.user_info.data[0];
              wx.setStorageSync('use_info', use_info);
              _this.triggerEvent("getBookList", use_info._id)
            }
          });
          _this.setData({
            use_list: res.userInfo
          })
        }
      })
    },
  }
})