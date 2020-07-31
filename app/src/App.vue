<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// import moment from 'moment'
export default {
  name: "App",
  components: {
   
  }
};
</script>

<style>
html,
body,
div,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
dl,
dt,
dd,
ol,
form,
input,
textarea,
th,
td,
select {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
html,
body {
  min-height: 100%;
}

body {
  font-family: "Microsoft YaHei";
  font-size: 14px;
  color: #333;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
ul,
ol {
  list-style: none;
}

img {
  border: none;
  vertical-align: middle;
}

a {
  text-decoration: none;
  color: #232323;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
}

input,
textarea {
  outline: none;
  border: none;
}

textarea {
  resize: none;
  overflow: auto;
}

.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: ".";
  width: 0;
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
  overflow: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.tl {
  text-align: left;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}

.ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.inline {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #f4f5f5;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  /* border:1px solid red; */
  box-sizing: border-box;
  /* color: #2c3e50; */
}
ul.nav .normal {
  color: #71777c;
}
ul.nav .selected {
  color: #007fff;
}
</style>
