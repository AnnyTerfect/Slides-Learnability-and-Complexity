<template>
	<svg :class="class" v-html="html"></svg>
</template>

<script>
	import "mathjax-full/es5/tex-svg-full";
	export default {
		props: ['class'],
		computed: {
			html () {
				return window.MathJax.tex2svg(this.$slots.default ? this.$slots.default()[0].children : '').innerHTML
			}
		},
	}
</script>

<style>
	.equation > svg{
		margin: auto;
	}
</style>