<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <!-- 授权浮层 -->
    <auth-popup :visible.sync="authVisible" @done="handleAuthDone"></auth-popup>

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import PageMixin from '@/mixins/page';
import { getSetting, openSetting } from '@/utils/wechat';
import wx from '@/utils/wx';
import interfaces from '@/interfaces';

import AuthPopup from '@/components/auth-popup';
import Card from '@/components/card';

export default {
  mixins: [PageMixin],
  data() {
    return {
      motto: 'Hello World',
      authVisible: false,
      userInfo: {},
    };
  },

  components: {
    AuthPopup,
    Card,
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },

    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },

    async handleAuthDone() {
      this.authVisible = false;
      const res = await interfaces.getWxUserInfo();
      if (res === false) {
        this.checkUserAuth();
      } else {
        this.userInfo = res.userInfo;
      }
    },

    /**
     * 核查用户授权情况
     */
    async checkUserAuth() {
      try {
        const { authSetting } = await getSetting();
        // 第一次进入
        if (authSetting['scope.userInfo'] === undefined) {
          this.authVisible = true;
        } else if (authSetting['scope.userInfo'] === false) {
          // 如果没被授权，则强制进入授权页
          const me = this;
          wx.showModal({
            showCancel: false,
            title: '提示',
            content: '请允许小程序获取用户信息！',
            success: async () => {
              await openSetting();
              me.checkUserAuth();
            },
          });
        } else if (authSetting['scope.userInfo'] === true) {
          // 已经授权过了
          const res = await interfaces.getWxUserInfo();
          this.userInfo = res.userInfo;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  async created() {
    await this.checkUserAuth();
  },
};
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
