<template>
	<div class="equation" :style="{ fontSize: fontSize }" v-html="html" :class="class">
	</div>
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
		props: ['font-size'],
	}
</script>

<style>
	.equation > svg{
		margin: auto;
	}
</style>