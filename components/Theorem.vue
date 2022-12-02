<template>
	<div class="theorem p-2" :class="class" :name="name" :number="number">
		<b>{{ type ? type : "Theorem" }}{{ number ? ` ${number}` : '' }}</b>{{ name ? ` (${name})` : '' }}<b>.</b>&nbsp;&nbsp;<i><slot></slot></i>
	</div>
</template>

<style>
.theorem {
	font-family: "Times New Roman";
	border: 1px solid #000;
	line-height: 1.1em;
}
</style>

<script>
	export default {
		props: ['type', 'class', 'name', 'number']
	}
</script>
