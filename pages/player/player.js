// pages/rankingList/rankingList.js
var baseUrl = require('../../utils/api.js');
const myaudio = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgimg:"",
    songId:"",
    songUrl:'',
    isSonging:true,
    playicon:"../../img/cm2_fm_btn_play@2x.png"
  },
  getSongInfo:function(options){
    let _this = this;
    let picUrl = wx.getStorage({
      key:'picUrl',
      success(res){
        _this.setData({
          bgimg:res.data
        })
      }
    })
    this.setData({
      songId:options.id
    })
    this.playSong();
  },
  playSong:function(){
    let _this = this;
    wx.request({
      url: baseUrl + 'song/url?id='+_this.data.songId,
      header: {
          'Content-Type': 'application/json'
      },
      success: function (res) {
        myaudio.src = res.data.data[0].url;
        myaudio.play();
      }
    })
  },
  clickStart:function(){
    if(this.data.isSonging){
      myaudio.pause();
      this.setData({
        isSonging:false,
        playicon:"../../img/cm2_fm_btn_pause@2x.png"
      })
    }else{
      myaudio.play();
      this.setData({
        isSonging:true,
        playicon:"../../img/cm2_fm_btn_play@2x.png"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSongInfo(options); 
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