// miniprogram/pages/home/home.js
import request from "../../api/request";
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
            id = ''
        } = wx.getStorageSync('use_info');
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                if (res.errMsg.indexOf(':ok') > -1) {
                    wx.setStorageSync('openid', res.result.openid);
                }
                this.getBookList(id);
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
        // wx.showLoading({
        //     title: '加载中~~',
        // })
        request('selectUserBook', 'GET', {
            book_id: this.data.book_id || book_id,
        }).then(res => {
            this.setData({
                user_book: res.data
            })
            if (!book_id.detail) {
                this.setIsShow();
            }
            // wx.hideLoading();
        }).catch(err => {
            // wx.hideLoading();
        })
    },
    getBookList: function (user_id) {
        wx.showLoading({
            title: '加载中~~',
        })
        request('selectBookList', 'GET', {
            user_id: user_id.detail || user_id,
        }).then(res => {
            this.setData({
                data_list: res.data || []
            })
            wx.hideLoading();
        }).catch(err => {
            wx.hideLoading();
        })
    }
})