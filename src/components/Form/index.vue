<template>
  <el-form ref="form" label-width="100px" :inline="inlineData" :model="form">
    <!-- input 类型 -->
    <el-form-item v-for="item in formLabelData" :key="item.label" :label="item.label">
      <!-- 遍历这个数组，对应显示表单元素  formData[item.model]是对应obj[k]找到对象当中的属性名 -->
      <el-input v-if="item.type === 'input'" :placeholder="'请输入' + item.label" v-model="formData[item.model]"></el-input>
      <!-- 单选框 -->
      <el-switch v-if="item.type === 'switch'" v-model="formData[item.model]"></el-switch>
      <!-- 日期选择 -->
      <el-date-picker v-if="item.type === 'date'" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formData[item.model]" style="width: 100%"></el-date-picker>
      <!-- 多选类型 -->
      <el-select v-if="item.type === 'select'" placeholder="请选择" v-model="formData[item.model]" value="">
        <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <!-- 加一个插槽用来放自定义的结构 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'Form',
  props: {
    formLabel: { type: Array },
    form: { type: Object },
    inline: { type: Boolean }
  },

  created() {},
  data() {
    return {
      formLabelData: this.formLabel,
      formData: this.form,
      inlineData: this.inline
    }
  },
  watch: {
    form: function (newVal) {
      console.log(newVal)
      this.formData = newVal
    }
    // formLabel(newVal){
    //   this.formLabelData= newVal
    // }
  }
}
</script>

<style>
</style>