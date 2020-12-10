# 音平商城项目

## 首页

    1.点击请登录跳转到 login 页面；

    2.头部 input 框带有搜索引擎；

    3.点击 套装方案 跳转到 list 页面；

    4.移入套装方案和活动专区下拉菜单显示；

    5.移入全部商品分类列表，二级菜单显示

    6.页面 banner 部分是渐隐渐显轮播图

    7.浏览器向下滚动出现固定导航条，点击可以滚动到导航部分。

    8.点击头部 我的购物车 跳转到购物车页面


## 列表页

    1.利用jQuery向数据库发送请求，拿到数据渲染到页面

    2.分类标签包含一级筛选，排序方式点击切换倒序和正序

    3.使用jQuery-pagination插件实现分页器效果

    4.点击商品文字，跳转到详情页

    5.点击头部 我的音平标签跳转到首页，点击 我的购物车，跳转到购物车页面

    6.点击 加入购物车 会将该物品添加到我的购物车内。

## 详情页

    1.光标放入图片展示区域实现放大镜效果

    2.点击 + 按钮增加一个数量，点击 - 按钮减少一个数量，当数量值为1时不会出现负数

    3.点击加入购物车，会将该物品添加到我的购物车内，点击头部 我的购物车查看

## 购物车页

    1.带有单选全选功能，点击全选之后，显示总共物品数量以及总金额

    2.点击删除，物品将会移除

    3.点击 +/- 改变物品数量值

    4.点击 再去逛逛 重新跳回到 list 页面

## 登录页

    1.点击登录发送请求，接收到请求返回值，判断账户密码是否正确。用户密码正确跳转到首页，如果账户密码不正确输入框会题是账户密码错误
