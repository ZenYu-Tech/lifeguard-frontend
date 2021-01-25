<template>
  <div>
    <LayoutAdmin />
  </div>
</template>

<script>
export default {
  name: 'Admin',
  middleware: 'authenticate'
}
</script>
