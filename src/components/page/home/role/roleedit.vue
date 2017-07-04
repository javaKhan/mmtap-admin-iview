<template>
  <Row>
        <Col></Col>
        <Col span="6">
        <Form ref="roleref" :model="roleForm" :rules='ruleValidate' :label-width="80">
            <Form-item label="角色名称" prop="name">
                <Input v-model="roleForm.name" placeholder="请输入角色名称" style="width:200px"></Input>
            </Form-item>
            <Form-item label="角色说明" prop="comment">
                 <Input v-model="roleForm.comment" type="textarea" style="width:200px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('roleref')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
        </Col>
        <Col></Col>
    </Row>
</template>
<script>
import axios from 'axios'

export default {
  name:'roleedit',
  data(){
    return{
      ruleValidate:{
        name:[{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      roleForm:{
        name:'',
        comment:''
      }
    }
  },
  methods:{
    handleSubmit:function(obj){
      axios.put('http://localhost:9090/role',this.roleForm).then(res=>{
        this.$router.push('/home/role')
      }).catch(err=>{
        console.info(err);
      })
    },
    initData(){
      axios.get('http://localhost:9090/role/'+this.$route.params.rid).then(res=>{
        console.info(res);
        this.roleForm = res.data;
      }).catch(err=>{
        console.info(err);
      });
    }
  },
  created:function(){
    this.initData();
  }
}
</script>
<style></style>
