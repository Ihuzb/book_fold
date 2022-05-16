// miniprogram/pages/home/home.js
const cloud = wx.cloud;
cloud.init()
const db = cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data_list: [],
    user_book: [],
    is_show: false,
    book_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let {
      _id = ''
    } = wx.getStorageSync('use_info');
    this.getBookList(_id);
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        if (res.errMsg.indexOf(':ok') > -1) {
          wx.setStorageSync('openid', res.result.openid);
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  setInfo: function (e) {
    console.log(e);
    let {
      id
    } = e.currentTarget.dataset;
    let _this = this;
    wx.getStorage({
      key: 'use_list',
      success(res) {
        _this.setData({
          book_id: id
        })
        _this.setBookUser(id);
      },
      fail(error) {
        wx.showToast({
          title: '请点击头像登录~~',
          icon: 'none',
        })
      }
    })
  },
  setIsShow: function () {
    let _this = this;
    _this.setData({
      is_show: !_this.data.is_show
    })
  },
  setBookUser: function (book_id) {
    wx.cloud.callFunction({
      name: 'userBook',
      data: {
        book_id: this.data.book_id || book_id
      },
      complete: res => {
        console.log(res.result, 333);
        this.setData({
          user_book: res.result.list
        })
        if (!book_id.detail) {
          this.setIsShow();
        }
      }
    });
  },
  getBookList: function (user_id) {
    wx.cloud.callFunction({
      name: 'bookList',
      data: {
        user_id: user_id.detail || user_id
      },
      complete: res => {
        this.setData({
          data_list: res.result.list
        })
      }
    });
  }
})