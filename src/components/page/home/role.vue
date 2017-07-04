<template>
    <div>
        <div>
            <Button type="info" @click="goAddRole">添加角色</Button>
        </div>
        <Table height="200" :columns="roleCol" :data="roles"></Table>
        <Page :total="totalElements" show-total></Page>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'role',
    data() {
        return {
            roleCol: [
                {
                    title: '角色名称',
                    key: 'name'
                },
                {
                    title: '更新时间',
                    key: 'updateTime'
                },
                {
                    title: '说明',
                    key: 'comment'
                },
                {
                    title: '操作', key: 'action', width: 120, align: 'center', fixed: 'right', render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    shape: "circle"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goEdit(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                    shape: "circle"
                                },
                                on: {
                                    click: () => {
                                        this.goRemove(params.row)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            roles: [

            ],
            totalElements: 0
        }
    },
    methods: {
        goAddRole() {
            this.$router.push('/home/roleadd');
        },
        initData() {
            axios.get('http://localhost:9090/role').then(res => {
                console.info(res);
                this.roles = res.data.content;
                this.totalElements = res.data.totalElements;
            }).catch(err => {
                console.info(err);
            });
        },
        goEdit(row) {
            this.$router.push('/home/roleedit/' + row.id)
        },
        goRemove(row) {
            this.$Modal.confirm({
            title: '确认删除数据',
            content: '<p>确认要删除角色吗？</p>',
            onOk: () => {
                this.$Message.info('点击了确定');
                axios.delete('http://localhost:9090/role/'+row.id).then(res=>{
                  console.info(res);
                  this.initData();
                }).catch(err=>{
                  console.info(err);
                });
            },
            onCancel: () => {
                // this.$Message.info('点击了取消');
            }
        });
        }
    },
    created() {
        this.initData();
    }
}

</script>
