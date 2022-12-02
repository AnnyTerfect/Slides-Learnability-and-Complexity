<template>
	<div class="proof p-2" :class="class">
		<i>{{ type ? type : "Proof" }}</i>.&nbsp;&nbsp;<i><slot></slot></i>
		<div class="rect"></div>
	</div>
</template>

<style>
.proof {
	font-family: "Times New Roman";
	line-height: 1.1em;
	position: relative;
}
.rect {
	position: absolute;
	right: 1px;
	bottom: 1px;
	width: 10px;
	height: 10px;
	background: #000;
}
</style>

<script>
	export default {
		props: ['type', 'class']
	}
</script>
