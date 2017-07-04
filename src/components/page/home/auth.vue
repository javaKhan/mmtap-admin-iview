<template>
  <div>
    <div>
      <Button type="info" @click="goAddAuth">添加权限</Button>
    </div>
    <div>
      <Table height="200" :columns="authCol" :data="authPage"></Table>
      <Page :total="totalElements" show-total></Page>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'auth',
  data() {
    return {
      authCol: [
        { title: '权限名称', key: 'name' },
        { title: '权限类型', key: 'type' },
        { title: 'URL', key: 'url' },
        { title: '描述', key: 'comment' },
        { title: '操作时间', key: 'updateTime' },
        {title: '操作',key: 'action',width: 120, align: 'center',fixed: 'right',render:(h, params)=>{
          return h('div',[
            h('Button', {
                  props: {
                      type: 'primary',
                      size: 'small',
                      shape:"circle"
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
                      shape:"circle"
                  },
                  on: {
                      click: () => {
                          this.goRemove(params.row)
                      }
                  }
              }, '删除')
          ])
        }}
      ],
      authPage: [],
      totalElements:0
    }
  },
  methods: {
    goAddAuth() {
      this.$router.push('/home/authadd')
    },
    initData() {
      axios.get('http://localhost:9090/auth').then(res => {
        console.info(res)
        this.authPage = res.data.content;
        this.totalElements =  res.data.totalElements;
      }).catch(err => { 
        console.info(err) }
      );
    },
    goEdit(row){
       this.$router.push('/home/authedit/' + row.id)
    },
    goRemove(row){
      this.$Modal.confirm({
            title: '确认删除数据',
            content: '<p>确认要删除权限吗？</p>',
            onOk: () => {
                this.$Message.info('点击了确定');
                axios.delete('http://localhost:9090/auth/'+row.id).then(res=>{
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
  created(){
    this.initData();
  }
}
</script>
