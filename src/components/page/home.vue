<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="1">
                    <Icon type="ios-navigate"></Icon>
                    导航一
                </Menu-item>
                <Menu-item name="2">
                    <Icon type="ios-keypad"></Icon>
                    导航二
                </Menu-item>
                <Menu-item name="3">
                    <Icon type="ios-analytics"></Icon>
                    导航三
                </Menu-item>
                <Menu-item name="4">
                    <Icon type="ios-paper"></Icon>
                    导航四
                </Menu-item>
            </div>
        </Menu>
    
        <div class="layout-content">
            <Row>
                <i-col span="4">
                    <Menu active-name="/home/user" @on-select="selectMenu" width="auto" :accordion="isAccordion" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                用户权限
                            </template>
                            <Menu-item name="/home/user">用户管理</Menu-item>
                            <Menu-item name="/home/group">组织管理</Menu-item>
                            <Menu-item name="/home/role">角色管理</Menu-item>
                            <Menu-item name="/home/auth">权限管理</Menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                导航二
                            </template>
                            <Menu-item name="2-1">选项 1</Menu-item>
                            <Menu-item name="2-2">选项 2</Menu-item>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                导航三
                            </template>
                            <Menu-item name="3-1">选项 1</Menu-item>
                            <Menu-item name="3-2">选项 2</Menu-item>
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="20">
                    <div class="layout-content-main">
                        <transition name="mytran">
                            <router-view></router-view>
                        </transition>
                    </div>
                </i-col>
            </Row>
        </div>
        <div class="layout-copy">
            2017 &copy; www.imkzp.com
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            isAccordion: true
        }
    },
    methods: {
        selectMenu: function (name) {
            console.info("选择了" + name);
            return this.$router.push(name);
        }
    }
}
</script>
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
}

.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.mytran-enter {
  opacity:0;
}
.mytran-leave{
  opacity:1;
}
.mytran-enter-active{
  transition:opacity .5s;
}
.mytran-leave-active{
  opacity:0;
  /*transition:opacity .5s;*/
}
</style>


