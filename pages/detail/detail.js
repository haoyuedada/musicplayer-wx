// pages/rankingList/rankingList.js
var baseUrl = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    songList:[],
    bg:null
  },
  getSonglist:function(){
    let _this = this;
    wx.request({
          //url: baseUrl + 'playlist/detail?id=3778678',
          url: baseUrl + 'playlist/detail?id='+_this.id,
          header: {
              'Content-Type': 'application/json'
          },
          success: function (res) {
              // console.log(res.data.result);
              if (res.data.code == 200) {
                  _this.setData({
                    songList: res.data.playlist.tracks.slice(0,10),
                    bg: res.data.playlist.tracks[5].al.picUrl
                  })
              }
          }
    })
  },
  newView:function(e){
    let _this = this;
    let id = e.currentTarget.dataset.id;
    let picurl = e.currentTarget.dataset.url;
    wx.setStorage({
      key:'picUrl',
      data:picurl
    });
    wx.navigateTo({
      url: '../player/player?picUrl='+picurl+'&id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.id = options.id;
    this.getSonglist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})