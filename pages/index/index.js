//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageScrollToFixed:false,
    filterMaskShow:false,   //蒙版显示
    classTapType:0,         //选择的分类
    classStep_1_val:0,          //分类 - 一级分类
    classStep_2_show:false,     //分类 - 二级分类 - 是否显示
    classStep_2_val:0,          //分类 - 二级分类
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //点击筛选想 - 分类 - 二级分类
  classTapFun2:function(e){
    var val = e.currentTarget.dataset.type;
    console.log(123)

    this.setData({
      classStep_2_show: false,
      filterMaskShow:false,
      classStep_2_val: val,
    })
    console.log(this.data.classStep_2_val)
  },
  //点击筛选项 - 分类 - 一级分类
  classTapFun1: function (e) {
    var val = e.currentTarget.dataset.type;
    
    this.setData({
      classStep_2_show: true,
      classStep_1_val: val,
    })
  },
  //点击筛选项
  classTapFun:function(e){
    this.setData({
      filterMaskShow:false,
      classTapType:0
    })
  },
  //点击筛选菜单
  chooseClass:function(e){
    var val = e.currentTarget.dataset.type;
    if (val == this.data.classTapType){
      this.setData({
        filterMaskShow: false,
        classTapType:0
      })
    }else{
        this.setData({
          filterMaskShow: true,
          classTapType: val
        })
    }
  },
  //点击分类按钮
  goClassFilter:function(e){
    wx.pageScrollTo({
      scrollTop:260
    })
  },
  //页面滚动监听
  onPageScroll:function(e){
    if (e.scrollTop > 260){
      this.setData({
        pageScrollToFixed:true
      })
    }else{
      this.setData({
        pageScrollToFixed: false
      })
    }
  }
})
