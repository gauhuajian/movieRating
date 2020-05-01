const app = getApp()
const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    url:'',
    start:0,
    count:10
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const global = app.globalData
      const url = global.url
      const coming = global.coming
      const theaters = global.theaters
      const top250 = global.top250
      switch (options.title) {
        case '影院热映':
          http.request(url+coming,this.getHttp)
          this.setData({
            url:url+coming
          })
          break;
        case '热门':
          http.request(url+theaters,this.getHttp)
          this.setData({
            url:url+coming
          })
          break;
        case '排行榜':
          http.request(url+top250,this.getHttp)
          this.setData({
            url:url+coming
          })
          break;
        default:
          break;
      }
      wx.setNavigationBarTitle({
        title:options.title
      })
  },
  getHttp(res){
    let arr =[]
    if(this.data.start>0){
      arr = this.data.list.concat(res.subjects)
    }else{
      arr=res.subjects
    }
     this.setData({
      list:arr
    })
  },
  load(){
    this.setData({
      start:this.data.start+=10
    })
    http.request(this.data.url+"?start="+this.data.start+"&count=10",this.getHttp)
  },
  toDetails(e){
    const id =  e.currentTarget.dataset.id
    wx:wx.navigateTo({
      url: "/pages/details/details?id="+id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})