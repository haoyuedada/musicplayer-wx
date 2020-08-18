//index.js
var baseUrl = require('../../utils/api.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    currentTab:1,
    banner:[],
    personalized:[],//推荐歌单
    // 推荐新音乐
    newsong: [],
    newest:[]
  },
  swichNav:function(e){
    console.log(e);
    var _this = this;
    if(this.data.currentTab === e.target.dataset.current){
      return false;
    }else{
      _this.setData({
        currentTab:e.target.dataset.current
      })
    }
  },
  /**
     * 推荐新音乐
     */
    getNewsong() {
      let that = this;
      wx.request({
          url: baseUrl + 'personalized/newsong',
          header: {
              'Content-Type': 'application/json'
          },
          success: function (res) {
              // console.log(res.data.result);
              if (res.data.code == 200) {
                  that.setData({
                      newsong: res.data.result
                  })
              }
          }
      })
  },
  swiperChange: function (e) {

    console.log(e);

    this.setData({

        currentTab: e.detail.current,

    })
},
/**
     * 获取新碟信息
     */
    getNewest() {
      let that = this;
      wx.request({
          url: baseUrl + 'album/newest',
          header: {
              'Content-Type': 'application/json'
          },
          success: function (res) {
              // console.log(res);
              if (res.data.code == 200) {
                  that.setData({
                      newest: res.data.albums
                  })
              }
          }
      })
  },
  // 打开菜单新页面
  openNewView: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    if (id == 0) {
        // 每日推荐
        wx.showModal({
          title:'提示',
          content:'此功能未开发',
          showCancel:false
        })
    }
    if (id == 1) {
        // 歌单
        wx.showModal({
          title:'提示',
          content:'此功能未开发',
          showCancel:false
        })
    }
    if (id == 2) {
        // 排行榜
        wx.navigateTo({
            url: '../rankingList/rankingList',
        })
    }
    if (id == 3) {
        // 电台
        wx.showModal({
          title:'提示',
          content:'此功能未开发',
          showCancel:false
        })
    }
    if (id == 4) {
        // 直播
        wx.showModal({
          title:'提示',
          content:'此功能未开发',
          showCancel:false
        })
    }
  },
  getBanner:function(){
    let _this = this;
    wx.request({
      url: baseUrl+'banner',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data.code == 200){
          _this.setData({
            banner:res.data.banners
          })
        }
      }
    })
  },
  getPersonalized:function(){
        let _this = this;
        wx.request({
            url: baseUrl + 'personalized?limit=6',
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.data.code == 200) {
                    let pageData = res.data.result;
                    // 播放量四舍五入精确到万
                    pageData.forEach(function (item, index) {
                        item.playCount = (item.playCount / 10000).toFixed(0)
                    })
                    _this.setData({
                        personalized: pageData
                    })

                }
            }
        })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getBanner();
    this.getPersonalized();//获取歌单数据
    this.getNewsong();//推荐新音乐
    this.getNewest();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
