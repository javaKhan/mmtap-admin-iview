<template>
  <div id="login">
    <Row type="flex" justify="center" class="m-row">
      <col span="8">
      <!--<img src="../assets/logo.png">-->
      <Form ref="formInline" :model="loginUser" :rules="loginRule">
        <Form-item prop="username">
          <Input type="text" v-model="loginUser.username" placeholder="账号">
                           <Icon type="ios-person-outline" slot="prepend"></Icon> 
           <!--<template slot="prepend">账户:</template>-->
          </Input>
        </Form-item>

        <Form-item prop="password">
          <Input type="password" v-model="loginUser.password" placeholder="密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>

        <Form-item>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          <Button type="primary" @click="handleSubmit('formInline')">重填</Button>
        </Form-item>

      </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginUser: {
          username: 'aaaaaa',
          password: 'aaaaaa',
          pcode: ''
        },
        loginRule: {
          username: [{required: true, message: '请填写用户名', trigger: 'blur'}],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('提交成功!');
            this.$router.push('/home');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
  }

  #login {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
