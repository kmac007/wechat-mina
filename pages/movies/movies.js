var util = require('../../utils/util.js');
var app = getApp()
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var api = 'https://api.douban.com/v2/movie/'
    this.getMoviesList(`${api}in_theaters`)
    this.getMoviesList(`${api}coming_soon`)
    this.getMoviesList(`${api}top250`)
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

  //跳转到搜索页
  redirectToSearch() {
    console.log("跳转到搜索页")
  },

  //更多电影
  handleMoreMovie(e) {
    wx.navigateTo({
      url: `more-movie/more-movie?category=${e.currentTarget.dataset.id}`,
    })
  },

  //获取电影条目信息
  getMoviesList(url) {
    var that = this
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.handleMoviesList(res.data)
      }
    })
  },
  //将星星对应字符串转换为数组
  handleStars(data) {
    for (var i = 0; i < data.subjects.length; i++) {
      data.subjects[i].rating.stars = util.convertStarsToArray(data.subjects[i].rating.stars)
    }
  },
  //数据处理函数
  handleMoviesList(data) {
    switch (data.title) {
      case '正在上映的电影-北京':
        data.title = '正在热映'
        data.subjects = data.subjects.slice(0, 7)
        this.handleStars(data)
        this.setData({
          in_theaters: data
        })
        break;
      case '即将上映的电影':
        data.title = '近期上映'
        data.subjects = data.subjects.slice(0, 7)
        this.handleStars(data)
        this.setData({
          coming_soon: data
        })
        break;
      case '豆瓣电影Top250':
        data.title = 'Top250'
        data.subjects = data.subjects.slice(0, 7)
        this.handleStars(data)
        this.setData({
          top250: data
        })
        break;
    }
    wx.hideLoading()
  },
  //跳转到详情页
  redirectToDetail(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `movie-detail/movie-detail?id=${id}`,
    })
  }
})