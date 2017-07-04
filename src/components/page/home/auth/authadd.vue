<template>
  <Row>
        <Col></Col>
        <Col span="6">
        <Form ref="authref" :model="authForm" :rules='ruleValidate' :label-width="80">
            <Form-item label="权限名称" prop="name">
                <Input v-model="authForm.name" placeholder="请输入权限名称" style="width:200px"></Input>
            </Form-item>
            <Form-item label="权限类型" prop="type">
              <Radio-group v-model="authForm.type">
                <Radio label="menu">菜单</Radio>
                <Radio label="url">URL</Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="操作地址">
              <Input v-model="authForm.url" placeholder="请输入URL请求地址" style="width:200px"></Input>
            </Form-item>
            <Form-item label="权限说明" prop="comment">
                 <Input v-model="authForm.comment" type="textarea" style="width:200px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('authref')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
        </Col>
        <Col></Col>
    </Row>
</template>
<script>
import axios from 'axios'

  export default{
    name:'authadd',
    data(){
      return{
        authForm:{type:'menu'},
        ruleValidate:{}
      }
    },
    methods:{
      handleSubmit:function(obj){
        this.$refs[obj].validate(validate=>{
          if(validate){
            axios.put('http://localhost:9090/auth',this.authForm).then(res=>{
              console.info(res);
              this.$router.push('/home/auth')
            }).catch(err=>{
              console.info(err)
            });
          }else{
            this.$Message.error('表单验证失败!');
          }
        });
      }
    }
  }
</script>
<style></style>
