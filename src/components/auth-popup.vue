<template>
  <div class="popup auth-popup" v-if="visible">
     <button
      class="btn btn-auth"
      @getuserinfo="handleUserInfo"
      open-type="getUserInfo">点击授权</button>
  </div>
</template>
<script>
export default {
  name: 'auto-popup',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleUserInfo() {
      console.log('auth done');
      this.$emit('done');
    },
  },
};
</script>
<style lang="scss" scoped>
.auth-popup {
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

