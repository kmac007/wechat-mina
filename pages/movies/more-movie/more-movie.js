const util = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoadingMore: false,
    start: 0,
    subjects: {},
    hasMoreMovie: true,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      category: options.category,
      start: 0
    })
    wx.setNavigationBarTitle({
      title: options.category,
    })
    var api = 'https://api.douban.com/v2/movie/'
    var url = this.switchApiAddress(options.category, api)
    var that = this
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.handleStars(res.data)
        that.setData({
          total: res.data.total
        })
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
    wx.hideLoading()
  },
  //跳转到详情页
  redirectToDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../movie-detail/movie-detail?id=${id}`,
    })
  },
  //加载更多
  handleLoadMore(e) {
    var api = 'https://api.douban.com/v2/movie/'
    if (!this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: true
      })
      var url = this.switchApiAddress(this.data.category, api)
      var that = this
      var start = this.data.start += 20
      if (this.data.subjects.length >= this.data.total) {
        this.setData({
          hasMoreMovie: false
        })
        return
      }
      wx.showNavigationBarLoading()
      wx.request({
        url: url,
        data: {
          start: start,
        },
        header: {
          'content-type': 'json'
        },
        success(res) {
          var totalSubjects = that.data.subjects
          var newSubjects = res.data.subjects
          // 将新获得的subjects的stars改变为数组
          for (var i = 0; i < newSubjects.length; i++) {
            newSubjects[i].rating.stars = util.convertStarsToArray(newSubjects[i].rating.stars)
          }
          //合并到原数组中
          var nextSubjects = totalSubjects.concat(newSubjects)
          that.setData({
            isLoadingMore: false,
            start: start,
            subjects: nextSubjects
          })
          wx.hideNavigationBarLoading()
        }
      })
    }
  },
  //由类别选择访问相应的API
  switchApiAddress(category, api) {
    var url = ''
    switch (category) {
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
    return url
  },
  //跳转到搜索页
  redirectToSearch() {
    wx.navigateTo({
      url: '../search-page/search-page',
    })
  },
})