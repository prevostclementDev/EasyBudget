<template>
      
    <div class="boxBorderStyle">

        <div class="topBar">
            <h2 class="titleBox">{{ title }}</h2>
        </div>
        <div class="box">
            <slot></slot>
        </div>

    </div>

</template>

<script>

export default {
  name: 'boxContent',
  props : {
    title : "",
  }
}
</script>