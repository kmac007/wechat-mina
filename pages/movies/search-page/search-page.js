// pages/movies/search-page/search-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  //取消搜索
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  },

  // 搜索
  search(e){
    var subjects = []
    var api = "https://api.douban.com/v2/movie/search?q="
    var that = this
    wx.request({
      url: `${api}${e.detail.value}`,
      header: {
        "content-type": "json"
      },
      success(res){
        for(var i = 0; i < res.data.subjects.length; i++){
          var obj = {}
          obj.title = res.data.subjects[i].title
          obj.img = res.data.subjects[i].images.small
          obj.rating = res.data.subjects[i].rating.average
          if(res.data.subjects[i].rating.average == 0){
            obj.rating = "暂无评分"
          }
          obj.year = res.data.subjects[i].year
          obj.id = res.data.subjects[i].id
          subjects.push(obj)
        }
        that.setData({
          subjects: subjects
        })
      }
    })
  },
  redirectToDetail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../movie-detail/movie-detail?id=${id}`,
    })
  },
})