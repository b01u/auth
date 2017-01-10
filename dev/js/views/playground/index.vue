<template>
  <div class="palyground tc p20">
    <label-input :label-list="labelList"></label-input>

    <ks-switch :checked.sync="checkValue"></ks-switch>
  </div>
</template>

<script lang="babel">
  import labelInput from './label-input.vue'

  export default{
    data () {
      return {
        labelList: [],
        checkValue: true
      }
    },

    created () {
      setTimeout(() => { this.checkValue = !this.checkValue }, 1)
    },

    components: {
      labelInput
    }
  }
</script>
