<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import 'styles/_reset.scss';
@import 'styles/_fonts.scss';
@import 'styles/_colors.scss';
@import 'styles/_sizes.scss';
@import 'styles/_layout.scss';
</style>
