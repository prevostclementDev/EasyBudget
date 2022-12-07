<template>
      
    <main class="baseContent">
        <div class="sideBarPlace">
            <slot name="sidebar"></slot>
        </div>
        <div class="ContentPlace">
            <slot name="content"></slot>
        </div>
    </main>

</template>

<script>

export default {
  name: 'baseContent',
}
</script>