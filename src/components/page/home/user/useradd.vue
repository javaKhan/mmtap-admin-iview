<template>
    <Row>
        <Col span="4">
        <span>&nbsp;</span>
        </Col>
        <Col span="6">
        <Form ref="formValidate" :model="user" :rules="ruleValidate" :label-width="80">
            <Form-item label="账号" prop="account">
                <Input v-model="user.account" placeholder="请输入账号"></Input>
            </Form-item>
            <Form-item label="密码" prop="password">
                <Input v-model="user.password" placeholder="请输入密码"></Input>
            </Form-item>
            <Form-item label="姓名" prop="name">
                <Input v-model="user.name" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="电话" prop="mobile">
                <Input v-model="user.mobile" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
                <Input v-model="user.email" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="组织" prop="group">
                <Select v-model="user.group.id" placeholder="请选择所在组织">
                    <Option v-for="item in groups" :value="item.id" :key="item">{{ item.name }}</Option>
                </Select>
            </Form-item>
            <Form-item label="用户状态">
                <Radio-group v-model="user.state">
                    <Radio label="启用"></Radio>
                    <Radio label="暂停"></Radio>
                    <Radio label="失效"></Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="性别" prop="gender">
                <Radio-group v-model="user.gender">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="介绍" prop="comment">
                <Input v-model="user.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
        </Col>
        <Col span="14">
        <Tree :data="group"></Tree>
        </Col>
    </Row>
</template>
<script>
import axios from 'axios'

export default {
    name: 'useradd',
    data() {
        return {
            group: [],
            user: {
                account:'',
                password:'',
                name: '',
                email: '',
                mobile:'',
                group: {},
                gender:'男',
                state: '启用',
                comment:''
            },
            ruleValidate: {
                account:[
                     { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password:[
                     { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ]
            },
            groups:[]
        }
    },
    methods: {
        handleSubmit(name) {
            let that = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.info(this.user);
                    axios.put('http://localhost:9090/user',this.user)
                    .then(function(res){
                        
                        console.info(res);
                        that.$router.push('/home/user');
                    }).catch(function(error){
                        console.info(error);
                    });
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    },
    created(){
        axios.get('http://localhost:9090/groups').then(res=>{
            console.info(res)
            this.groups = res.data;
        }).catch(err=>{
            console.info(err)
        })
    }
}
</script>

<style>

</style>

