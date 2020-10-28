<template>
	<v-row>
		<v-col col="12">
			<div class="hand-1">
				<v-row>
					<v-col cols="1" v-for="(card, index) in hand1" :key="index">
						<v-card
							class="mx-auto"
							:color="`${card.color} darken-2`"
							height="200"
							align="center"
							justify="center"
						>
							<h1>
								<v-icon size="100" class="white--text">
									{{ cardVisual(card.value) }}
								</v-icon>
							</h1>
						</v-card>
					</v-col>
				</v-row>
			</div>
			<div class="game-area" align="center" justify="center">
				<canvas
					ref="game"
					width="640"
					height="480"
					style="border: 1px solid black; border-radius: 15px"
				>
				</canvas>
			</div>
			<div class="hand-2">
				<v-row>
					<v-col cols="1" v-for="(card, index) in hand2" :key="index">
						<v-card
							class="mx-auto"
							:color="`${card.color} darken-2`"
							height="200"
							align="center"
							justify="center"
						>
							<h1>
								<v-icon size="100" class="white--text">
									{{ cardVisual(card.value) }}
								</v-icon>
							</h1>
						</v-card>
					</v-col>
				</v-row>
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
		this.socket.on("game_start", (data) => {
			console.log(data);
			for (let i = 0; i < 7; i++) {
				let index1 = Math.floor(Math.random() * data.length);
				this.hand1.push(data[index1]);
				data.splice(index1, 1);
				let index2 = Math.floor(Math.random() * data.length);
				this.hand2.push(data[index2]);
				data.splice(index2, 1);
			}
			console.log(this.hand1, this.hand2);
			console.log(data);
		});
		this.socket.on("position", (data) => {
			this.position = data;
			this.context.clearRect(
				0,
				0,
				this.$refs.game.width,
				this.$refs.game.height
			);
			this.context.fillRect(this.position.x, this.position.y, 20, 20);
		});
	},

	data() {
		return {
			socket: {},
			player1: "",
			player2: "",
			context: {},
			hand1: [],
			hand2: [],
			position: {
				x: 0,
				y: 0,
			},
		};
	},

	methods: {
		move(direction) {
			this.socket.emit("move", direction);
		},

		cardVisual(value) {
			if (value === "block") return "fa4 fa-ban";
			if (value === "reverse") return "fa4 fa-refresh";
			return value
		},
	},
};
</script>

<style>
</style>