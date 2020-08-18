// pages/rankingList/rankingList.js
var baseUrl = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bangdan:[],
    guanfang:[]
  },
  openNewView:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id='+id,
  })
  },
  getBangdan:function(){
    var _this = this;
    wx.request({
      url: baseUrl + 'toplist/detail',
          header: {
              'Content-Type': 'application/json'
          },
          success: function (res) {
              // console.log(res.data.result);
              if (res.data.code == 200) {
                  _this.setData({
                    bangdan: res.data.list.slice(7,10),
                    guanfang:res.data.list.slice(0,4),
                  })
              }
          }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBangdan();
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