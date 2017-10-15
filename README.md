# 写在前面
## 为什么要写这个小程序?
前不久ofo的小程序重新上线了，和摩拜一样，使用微信小程序来扫码租车十分方便。十分契合小程序“用完即走”的理念。我体验了一番，小程序的流畅程度是优于普通webapp的，虽然暂时还不了解小程序的底层知识，但我觉得小程序是值得学习的。另外，豆瓣提供的开放API十分友好，因此我通过查看相应的文档写下了这个小程序。

# 开发工具
微信开发者工具v1.01.170925

# 项目预览
<div align="center"><img src="https://github.com/kmac007/wechat-mina/blob/master/preview/mina-1.gif" alt="pc"/></div>
<div align="center"><img src="https://github.com/kmac007/wechat-mina/blob/master/preview/mina-2.gif" alt="pc"/></div>
<div align="center"><img src="https://github.com/kmac007/wechat-mina/blob/master/preview/mina-3.gif" alt="pc"/></div>

# 总结
总的来说，小程序上手起来还是相当的简单的。小程序官方内置了很多常用的组件，比如swpier等，可以直接通过调用相应的组件快速完成一个应用。生命周期函数也十分浅显易懂。

它通过setData()进行数据的更新，这个方法是异步的，这让我想起了React.js中的setState()方法，我还没有深入研究，但感觉这两者十分的相似。

有人说数据绑定方面有点像angular，但由于我还没有用过angular，所以不作对比。与Vue相比，列表循环、条件判断、数据绑定，十分相似。

这个项目主要是学习小程序时写的练手项目，样式直接参照了豆瓣官方的豆瓣评分小程序。