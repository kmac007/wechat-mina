const util = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subjects: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.category
    })
    var api = 'https://api.douban.com/v2/movie/'
    var url = ''
    switch (options.category) {
      case '正在热映':
        url = `${api}in_theaters`
        break
      case '近期上映':
        url = `${api}coming_soon`
        break
      case 'Top250':
        url = `${api}top250`
        break
    }
    var that = this
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.handleStars(res.data)
        // that.setData({
        //   subjects: res.data.subjects
        // })
      }
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

  },

  //将星星转为数组
  handleStars(data) {
    for (var i = 0; i < data.subjects.length; i++) {
      data.subjects[i].rating.stars = util.convertStarsToArray(data.subjects[i].rating.stars)
    }
    this.setData({
      subjects: data.subjects
    })
  },
})