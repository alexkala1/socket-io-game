<template>
	<v-row>
		<v-col col="12">
			<div class="game-area" align="center" justify="center">
				<canvas
					ref="game"
					width="640"
					height="480"
					style="border: 1px solid black; border-radius: 15px"
				>
				</canvas>
			</div>
			<div align="center">
				<v-btn v-on:click="move('right')">right</v-btn>
				<v-btn v-on:click="move('left')">left</v-btn>
				<v-btn v-on:click="move('up')">up</v-btn>
				<v-btn v-on:click="move('down')">down</v-btn>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import io from "socket.io-client";
export default {
	name: "BlockGame",

	created() {
		this.socket = io("http://localhost:3000");
	},

	mounted() {
		this.context = this.$refs.game.getContext("2d");
		this.socket.on("position", (data) => {
			this.position = data
			this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height)
			this.context.fillRect(this.position.x, this.position.y, 20, 20);
		});
	},

	data() {
		return {
			socket: {},
			context: {},
			position: {
				x: 0,
				y: 0,
			},
		};
	},

	methods: {
		move(direction) {
			this.socket.emit("move", direction)
		}
	}
};
</script>

<style>
</style>