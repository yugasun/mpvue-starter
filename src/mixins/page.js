export default {
  onShareAppMessage() {
    return {
      title: '分享标题',
      desc: '分享描述',
      path: '/pages/index/main',
      imageUrl: 'https://static.yugasun.com/avatar.jpg',
      success() {
        console.log('分享成功');
      },
    };
  },
};

