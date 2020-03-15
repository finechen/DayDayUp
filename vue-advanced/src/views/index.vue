<template>
  <diy-form :model="model" :rules="rules" ref="form">
    <diy-form-item label="用户名" prop="name">
      <diy-form-input v-model="model.name" autocomplete="off" placeholder="username"></diy-form-input>
    </diy-form-item>
    <diy-form-item label="密码" prop="pwd">
      <diy-form-input v-model="model.pwd"></diy-form-input>
    </diy-form-item>
    <diy-form-item>
      <input type="submit" @click="submitForm('form')" value="提交" />
    </diy-form-item>
  </diy-form>
</template>

<script>
import DiyForm from '../components/form/form.vue'
import DiyFormItem from '../components/form/formItem.vue'
import DiyFormInput from '../components/form/formInput.vue'
import Notification from '../components/notification/index.vue'
import create from '../utils/create'

export default {
  name: 'Index',
  data () {
    return {
      model: { name: 'fine', pwd: '' },
      rules: {
        name: [{ required: true, message: '请输入用户名' }],
        pwd: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  components: {
    DiyForm,
    DiyFormItem,
    DiyFormInput
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate(valid => {
        console.log('valid:--------------------- ', valid);
        // if (valid) {
        //   alert('校验通过')

        // } else {
        //   alert('校验失败')
        // }

        const notice = create(Notification, {
          title: '检验结果',
          message: valid ? '校验通过' : '校验失败',
          duration: 2000
        })
        notice.show()
      })
    }
  }
}
</script>
