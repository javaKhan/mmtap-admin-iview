<template>
  <div>
    <Row>
      <Col span="20">
        <div><Button type="info" @click="goUserInfo">添加用户</Button></div>
          <Table stripe border :columns="userCol" :data="users"></Table>
          <Row style="margin-top:20px;">
            <Col span="16"><Page :total="totalElements" show-total></Page></Col>
            <Col span="8"><Button type="primary" @click="exportData(1)">
              <Icon type="ios-download-outline"></Icon> 导出数据</Button></Col>
          </Row>
      </Col>
      <Col span="4">
          <Tree :data="groups"></Tree>
      </Col>
    </Row>



    <!--<Modal
        v-model="modal"
        title="用户删除操作"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确认要删除用户？</p>
       
    </Modal>-->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name:'user',
  data(){
    return{
      modal:false,
      totalElements:0,
      userCol:[
        {title: '账户',key: 'account',width: 100,fixed: 'left'},
        {title: '姓名',key: 'name',width: 100,fixed: 'left'},
        {title: 'email',key: 'email',width: 230},
        {title: '创建时间',key: 'createTime',width: 110},
        {title: '电话',key: 'mobile',width: 120},
        {title: '组织',key: 'group.name',width: 100},
        {title: '状态',key: 'state',width: 100},
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
                          this.edit(params.row)
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
                          this.remove(params.row)
                      }
                  }
              }, '删除')
          ])
        }},
      ],
      users:[
        // {account:'account',name:'那仁朝克图',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
        // {account:'account',name:'kkkkk',email:'aaaaaaaaaaaaaaaaa@126.com',ctime:'2014-10-11 12:23:33',mobile:'13800138000',group:'央视国际网络有限公司',state:'激活'},
      ],
      groups:[]
    }
  },
  methods:{

    loadData:function(){
      axios.get('http://localhost:9090/user')
            .then(response=>{
              console.log(response);
              this.users = response.data.content;
              this.totalElements = response.data.totalElements;
            }).catch(error=> {
              console.info(error);
            });
    },
    loadGroup:function(){
      axios.get('http://localhost:9090/groups/tree').then((res)=>{
      // console.info(res.data);
      this.groups = [{expand: true,title: '组织结构',children:res.data}];
      }).catch(err=>{
        console.info(err);
      });
    },
    goUserInfo:function(){
      this.$router.push('/home/useradd');
    },
    edit:function(row){
      // console.info(row);
      this.$router.push('/home/useredit/'+row.id);
    },
    remove:function(row){
      this.$Modal.confirm({
            title: '确认删除数据',
            content: '<p>确认要删除用户吗？</p>',
            onOk: () => {
                this.$Message.info('点击了确定');
                axios.delete('http://localhost:9090/user/'+row.id).then(res=>{
                  console.info(res);
                  this.loadData();
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
  created:function() {
    this.loadData();
    this.loadGroup();
  }
}
</script>
