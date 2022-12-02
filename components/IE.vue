<template>
	<span :style="{ fontSize: fontSize }" v-html="html">
	</span>
</template>

<script>
	import "mathjax-full/es5/tex-svg-full";
	export default {
		computed: {
			html () {
				return window.MathJax.tex2svg(this.$slots.default ? this.$slots.default()[0].children : '').innerHTML
			}
		},
		props: ['font-size'],
	}
</script>

<style>
	span .MathJax {
		display: inline !important;
	}
	span svg {
		display: inline;
	}
</style>