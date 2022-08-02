<!--
 * @Description: 个人主页组件
 * @Author: chowyonken
 * @Date: 2022-06-06
 * @update: 2022-07-01
 -->
<template>
  <div id="profile">
    <card-info-container/>
    <card-info-body/>
  </div>
</template>

<script>

  import CardInfoContainer from "@/views/profile/childComponent/CardInfoContainer";
  import CardInfoBody from "@/views/profile/childComponent/CardInfoBody";
  import {getUserInfo} from "@/network/api/user";

  export default {
    name: "ProfilePage",
    components: {
      CardInfoContainer,
      CardInfoBody
    },
    create() {
      this._getUserInfo()
    },
    methods: {
      _getUserInfo() {
        getUserInfo(this.id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #profile {
    margin: 0 auto;
    max-width: 1225px;
  }
</style>
