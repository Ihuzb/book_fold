// components/modal/modal.js
import request from "../../api/request";

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
                        id
                    } = wx.getStorageSync('use_info');
                    this.setData({
                        disabledInfo: newVal.find(v => v.user_id == id)
                    })
                } else {
                    this.setData({
                        disabledInfo: {}
                    })
                }
            }
        },
        setBookUser: Object,
        getBookList: Object,
        book_id: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        disabledInfo: {}
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
                id
            } = wx.getStorageSync('use_info');
            wx.chooseAddress({
                async success(res) {
                    request('insertAddresList', 'POST', {
                        book_id: _this.data.book_id,
                        user_id: id,
                        "province_name": res.provinceName,
                        "city_name": res.cityName,
                        "county_name": res.countyName,
                        "dateil_info": res.detailInfo,
                        "tel_number": res.telNumber,
                        "user_name": res.userName
                    }).then(res => {
                        wx.showToast({
                            title: '加入成功~~',
                            icon: 'success',
                        });
                        _this.triggerEvent('setBookUser', 1);
                        _this.triggerEvent('getBookList', id);
                    }).catch(err => {
                        wx.showToast({
                            title: '加入失败~~',
                            icon: 'error',
                        });
                    })
                }
            })
        }
    }
})