<template>
    <Row>
        <Col></Col>
        <Col span="6">
        <Form ref="groupref" :model="groupForm" :rules='ruleValidate' :label-width="80">
            <Form-item label="组织名称" prop="name">
                <Input v-model="groupForm.name" placeholder="请输入组织名称" style="width:200px"></Input>
            </Form-item>
            <Form-item label="输入框">
                <Cascader :data="groups" change-on-select @on-change="selectGroup"></Cascader>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('groupref')">保存</Button>
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
    name: 'groupadd',
    data() {
        return {
            groups: [{
                value: 'beijing',
                label: '北京',
                children: [
                    {
                        value: 'gugong',
                        label: '故宫'
                    },
                    {
                        value: 'tiantan',
                        label: '天坛'
                    },
                    {
                        value: 'wangfujing',
                        label: '王府井'
                    }
                ]
            }, {
                value: 'jiangsu',
                label: '江苏',
                children: [
                    {
                        value: 'nanjing',
                        label: '南京',
                        children: [
                            {
                                value: 'fuzimiao',
                                label: '夫子庙',
                            }
                        ]
                    },
                    {
                        value: 'suzhou',
                        label: '苏州',
                        children: [
                            {
                                value: 'zhuozhengyuan',
                                label: '拙政园',
                            },
                            {
                                value: 'shizilin',
                                label: '狮子林',
                            }
                        ]
                    }
                ],
            }],
            groupForm: {
                name: '',
                parent: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '角色不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        selectGroup(o, oo) {
            // console.info(oo);
            // console.info(o.length);
            if(o.length>0){
                this.groupForm.parent = {id: o[o.length-1]}
            }
            
        },
        handleSubmit(groupref) {
            let that = this;
            this.$refs[groupref].validate((valid) => {
                if (valid) {
                    console.info(this.groupForm);
                    axios.put('http://localhost:9090/group',this.groupForm)
                    .then(function(res){
                        that.$router.push('/home/group');
                    }).catch(function(error){
                        console.info(error);
                    });
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        }
    },
    created: function () {
        axios.get('http://localhost:9090/groups/cascader').then((res) => {
            this.groups = res.data;
        }).catch((err) => {
            console.info(err);
        });
    }
}
</script>
<style></style>
