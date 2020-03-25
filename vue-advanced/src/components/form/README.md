#### 简易版element组件el-form

1. ##### el-form的使用

   ```vue
   <el-form ref="form"  :model="form" :rules="rules" label-width="80px">
     <el-form-item label="姓名">
       <el-input v-model="form.name"></el-input>
     </el-form-item>
     <el-form-item label="密码">
       <el-input v-model="form.pwd"></el-input>
     </el-form-item>
     <el-form-item>
       <el-button @click="onSubmit">提交</el-button></el-button>
     </el-form-item>
   </el-form>
   <script>
     export default {
       data() {
         return {
           form: {
             name: '',
             pwd: '',
           },
           rules: {
             name: [
               { required: true, message: '请输入姓名' },
             ],
             pwd: [
               { required: true, message: '请输入密码' },
             ],
           }
         }
       },
       methods: {
         onSubmit() {
           console.log('submit!');
         }
       }
     }
   </script>
   ```

   先分析结构：可以看到，在form组件中，每一个表单域都由form-item组成，表单域中可以放置input等表单控件。根据代码结构划分，我们开始建立文件夹，文件结构如下（基于vue/cli3.x）

   ```
   └─src
       ├─components
       │  ├─form
       │  │      form.vue
       │  │      formInput.vue
       │  │      formItem.vue
       │  └─...
       │
       ├─...
       │
       └─views
               index.vue
   ```

   再分析功能：

   ​	input : 

   ​	form-item: 

   ​	form：需要承载表单域
   接下来就是实现功能了！

   ```vue
   <!-- formInput.vue -->
   <template>
     <div>
       <input type="text" :value="value" @input="onInput" v-bind="$attrs">
     </div>
   </template>
   
   <script >
   export default {
     name: 'FormInput',
     inheritAttrs: false,
     props: {
       value: {
         type: String
       }
     },
     data () {
       return {
         errMsg: ''
       };
     },
     methods: {
       // 监听输入框变化
       onInput (e) {
         // 输入框变化后进行检验通知
         this.$parent.$emit('validate');
       }
     }
   };
   </script>
   
   <!-- Add "scoped" attribute to limit CSS to this component only -->
   <style scoped lang="scss">
   h3 {
     margin: 40px 0 0;
   }
   ul {
     list-style-type: none;
     padding: 0;
   }
   li {
     display: inline-block;
     margin: 0 10px;
   }
   a {
     color: #42b983;
   }
   </style>
   
   ```

   ```vue
   <!-- formItem.vue -->
   <template>
     <div>
       <label v-if="label" for="">{{ label }}</label>
       <slot></slot>
       <p v-if="errMsg">{{ errMsg }}</p>
       <!-- {{form.rules}} -->
     </div>
   </template>
   
   <script>
   import Schema from 'async-validator'
   
   export default {
     name: 'FormItem',
     inject: ['form'],
     props: {
       label: {
         type: String
       },
       prop: {
         type: String
       }
     },
     data () {
       return {
         errMsg: ''
       }
     },
     mounted () {
       this.$on('validate', () => {
         this.validate()
       })
     },
     methods: {
       // 校验单项表单结果，并将结果返回给父级
       validate () {
         const value = this.form.model[this.prop]
         const rules = this.form.rules[this.prop]
         // npm i async-validate -S
         const desc = { [this.prop]: rules }
         const schema = new Schema(desc)
         // return的是校验结果的promise
         const res = schema.validate({ [this.prop]: value }, err => {
           if (err) {
             this.errMsg = err[0].message
             throw false
           } else {
             this.errMsg = ''
             return true
           }
         })
         return res
       }
     }
   }
   </script>
   
   <!-- Add "scoped" attribute to limit CSS to this component only -->
   <style scoped lang="scss">
   h3 {
     margin: 40px 0 0;
   }
   ul {
     list-style-type: none;
     padding: 0;
   }
   li {
     display: inline-block;
     margin: 0 10px;
   }
   a {
     color: #42b983;
   }
   </style>
   
   ```

   ```vue
   <!-- form.vue -->
   <template>
     <form action="javascript:void(0);">
       <slot></slot>
       <!-- {{model}} -->
       <!-- {{rules}} -->
     </form>
   </template>
   
   <script>
   
   export default {
     name: 'Form',
     components: {
   
     },
     props: {
       model: {
         type: Object,
         required: true
       },
       rules: {
         type: Object
       }
     },
     provide () {
       return {
         form: this
       }
     },
     methods: {
       // 校验表单
       validate (cb) {
         // 所有表单检验结果
         const tasks = this.$children
           .filter(item => item.prop)
           .map(item => item.validate())
         Promise.all(tasks).then((res) => {
           // 全校验通过返回 true
           cb(true)
         }).catch(() => {
           // 有一个不通过即返回 false
           cb(false)
         })
   
       }
     }
   }
   
   </script>
   
   <!-- Add "scoped" attribute to limit CSS to this component only -->
   <style scoped lang="scss">
   h3 {
     margin: 40px 0 0;
   }
   ul {
     list-style-type: none;
     padding: 0;
   }
   li {
     display: inline-block;
     margin: 0 10px;
   }
   a {
     color: #42b983;
   }
   </style>
   
   ```

   ```vue
   <!-- index.vue -->
   <template>
     <div>
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
     </div>
   </template>
   
   <script>
   import DiyForm from '../components/form/form.vue'
   import DiyFormItem from '../components/form/formItem.vue'
   import DiyFormInput from '../components/form/formInput.vue'
   
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
           if (valid) {
             alert('校验通过')
   
           } else {
             alert('校验失败')
           }
         })
       }
     }
   }
   </script>
   
   ```

   