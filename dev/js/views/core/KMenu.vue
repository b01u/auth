<template>
  <nav class="k-menu-container fix l">
    <ul class="k-menu">
      <div class="menu-container" v-for="mobj in Menu">
        <li class="k-menu__item title"
            v-text="mobj.name"
        ></li>
        <li class="k-menu__item trans" v-for="smobj in mobj.subMenu"
            v-link="{name: smobj.link}" :data-ksa="smobj.ksa"
        >
          <i class="k-menu__icon icon" :class="smobj.icon"></i>
          <span v-text="smobj.name"></span>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script lang="babel">
  import Menu from '../../data/menu'

  export default {
    data () {
      /**
       * Menu 菜单对象
       */
      return { Menu }
    }
  }
</script>
