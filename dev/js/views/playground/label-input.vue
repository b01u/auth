<template>
  <div class="labelInpComponent-container">
    <div class="labelInp-wrap" @click="$els.entity.focus()">
      <!--ul.labelInp-label_group>li.labelInp-label_item{$}*3-->
      <ul class="labelInp-label_group">
        <li class="labelInp-label_item" v-for="label in labelList"
            track-by="$index"
        >
          <span class="pr20" v-text="label"></span>
          <i class="iconfont f12" @click="removeLabel($index)">&#xe60d;</i>
        </li>
      </ul>
      <input type="text" class="labelInp-label-entity" v-el:entity
             @keyup.enter="appendLabel" @keydown.delete="removeLabel(-1)" v-model="text">
    </div>
  </div>
</template>

<script lang="babel">
  export default{
    data () {
      return {
        text: ''
      }
    },

    props: {
      labelList: { type: Array, required: true }
    },

    methods: {

      /**
       * @description 新增一个标签
       */
      appendLabel () {
        if (this.text === '') return

        this.labelList.push(this.text)
        this.text = ''
      },

      /**
       * @description 删除标签
       * @param index {Number} 索引
       */
      removeLabel (index) {
        if (index > -1) {
          this.labelList = this.labelList.filter((o, i) => i !== index)

          return
        }

        if (!this.text.length) {
          this.labelList = this.labelList.pop()
        }
      }
    }
  }
</script>

<style lang="scss">

  $inputWidth: 420px;
  $inputHeight: 36px;

  .labelInpComponent-container { display: inline-block }

  .labelInp-wrap {
    width: $inputWidth;
    border-radius: 3px; border: 1px solid gainsboro;
    text-align: left;
  }

  .labelInp-label_group { display: inline-block }
  .labelInp-label_item {
    display: inline-block; position: relative;
    height: 100%; padding: 0 3px; min-width: $inputHeight;
    border-radius: 2px; margin: 1px;
    line-height: $inputHeight; text-align: center;
    background: lightgray;

    & > .iconfont {
      position: absolute; top: 50%; right: 3px;
      margin-top: -6px;
      cursor: pointer;
      transform: scale(.8, .8);
    }
  }

  .labelInp-label-entity {
    height: $inputHeight; width: 77px;
    border: none; outline: none;
  }
</style>
