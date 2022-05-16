// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    user_book: {
      type: Array,
      observer: function (newVal, oldVal, changePath) {
        if (newVal.length) {
          let {
            _id
          } = wx.getStorageSync('use_info');
          this.setData({
            disabled: newVal.findIndex(v => v.user_id == _id) > -1
          })
        } else {
          this.setData({
            disabled: false
          })
        }
      }
    },
    setBookUser: Function,
    book_id: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    disabled: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setIsShow: function () {
      this.triggerEvent('setIsShow')
    },
    addInfo: function () {
      let _this = this;
      let {
        _id
      } = wx.getStorageSync('use_info');
      wx.chooseAddress({
        success(res) {
          wx.cloud.callFunction({
            name: 'addAddres',
            data: Object.assign(res, {
              user_id: _id,
              book_id: _this.data.book_id
            }),
            complete: res => {
              wx.showToast({
                title: '加入成功~~',
                icon: 'success',
              });
              _this.triggerEvent('setBookUser', 1);
            }
          });
        }
      })
    }
  }
})