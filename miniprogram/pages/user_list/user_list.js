// pages/user_list/user_list.js
import request from "../../api/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        data_list: [],
        items: [{
                value: '',
                name: '全部',
                checked: 'true'
            },
            {
                value: '1',
                name: '待开始',
            },
            {
                value: '2',
                name: '待收货',
            },
            {
                value: '3',
                name: '进行中',
            },
            {
                value: '4',
                name: '已完成',
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.selectUserBookOrgin('')
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    goToBack() {
        wx.navigateBack({
            delta: 1
        })
    },
    selectUserBookOrgin(user_orgin) {
        request('selectUserBookOrgin', 'GET', {
            user_orgin,
        }).then(res => {
            this.setData({
                data_list: res.data || []
            })
        }).catch(err => {
            this.setData({
                data_list: []
            })
        })
    },
    radioChange(e) {
        let user_orgin = e.detail.value;
        this.selectUserBookOrgin(user_orgin)
    }
})