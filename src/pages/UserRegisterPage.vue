<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-image style="margin-left: 25%"
          round
          width="10rem"
          height="10rem"
          :src="logo"
      />

      <van-field
          v-model="username"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
          v-model="checkPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请确认密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册账号
      </van-button>
      <van-cell title="" to="/user/login" value="已有账号？点击登录"></van-cell>
    </div>
  </van-form>
</template>

<script setup  lang="ts">
import {ref} from "vue";
import {Toast} from "vant";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import logo from '../assets/register.png'

const router = useRouter()
const userAccount = ref('');
const username = ref('');
const checkPassword = ref('');
const password = ref('');


// const onSubmit = async () => {
//   const register = await request.post("/user/register", {
//     "checkPassword": checkPassword.value,
//     "userAccount": userAccount.value,
//     "userPassword": password.value,
//     "username": username.value
//   })
//   if (register) {
//     alert('注册成功')
//     await router.push("/user/login")
//   }
// };

const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    "checkPassword": checkPassword.value,
    "userAccount": userAccount.value,
    "userPassword": password.value,
    "username": username.value
  })
  if (res.code === 0 && res.data) {
    Toast.success('注册成功！');
    // 跳转到之前的页面
    window.location.href = `/user/login`;
  } else {
    Toast.fail('注册失败,'+res.description);
  }
}

</script>
<style scoped>
.float-right {
  display: block;
  /*float: right;*/
  margin-left: 13px;
  overflow: hidden;
   text-align: right;
   margin-right: 10px;
}

/* .float-right>span {*/
/*  display: block;*/
/*   color: #1989FA;*/
/*  margin: 13px auto 0;*/
/*  overflow: hidden;*/
/*  text-align: center;*/
/*}*/
</style>