<template>
	<blockGame />
</template>

<script>
import blockGame from "./components/BlockGame";

export default {
	name: "App",

	components: {
		blockGame,
	},

	data: () => ({
		//
	}),
};
</script>

<style>
body {
	height: 100vh;
	width: 100vw;
}
</style>