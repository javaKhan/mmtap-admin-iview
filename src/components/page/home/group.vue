<template>
  <div>
    <Row>
      <Col span="6">
      <Tree :data="groups"></Tree>
      </Col>
      <Col span="18">
       <div>    
         <Button type="primary" shape="circle" icon="person-stalker" @click="goAdd">添加组织</Button>
        </div>
        <Table highlight-row :columns="groupCols" :data="groupPage"></Table>
        <Page :total="totalElements" show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name:'group',
  data(){
    return {
      groupCols:[
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
            title: '名称',
            key: 'name'
        },
        {
            title: '更新时间',
            key: 'updateTime'
        },
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
      groupPage:[

      ],
      groups:[
        {  
          expand: true,
          title: '组织结构',
          children:[
            {     
              checked:false,
              title: 'parent 1-0',
              expand: true,
              children:[]
            }
           ]
        }
      ],
      totalElements:0
    }
  },
  methods:{
    initData:function(){
      axios.get('http://localhost:9090/groups/tree').then((res)=>{
      console.info(res.data);
      this.groups = [{expand: true,title: '组织结构',children:res.data}];
      }).catch(err=>{
        console.info(err);
      });
      axios.get('http://localhost:9090/group').then((res)=>{
        // console.info(res);
        this.groupPage = res.data.content;
        this.totalElements = res.data.totalElements;
      }).catch(err=>{
        console.info(err);
      });
    },
    goAdd:function() {
      this.$router.push("/home/groupadd")
    },
    goEdit:function(row){
      this.$router.push('/home/groupedit/'+row.id);
    },
    goRemove:function(row){
       this.$Modal.confirm({
            title: '确认删除数据',
            content: '<p>确认要删除组织吗？</p>',
            onOk: () => {
                this.$Message.info('点击了确定');
                axios.delete('http://localhost:9090/group/'+row.id).then(res=>{
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
