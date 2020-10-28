function initializeDeck() {
	const colors = ['blue', 'red', 'green', 'yellow'];
	const uniques = ['+4', 'color_change'];
	const cards = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', 'reverse', 'block',];

	let deck = [];

	colors.forEach(color => {
		cards.forEach(card => {
			deck.push({value: card, color: color});
			deck.push({value: card, color: color});
		})
	})

	uniques.forEach(unique => {
		deck.push({value: unique, color: 'black'})
		deck.push({value: unique, color: 'black'})
	})

	return deck;
}

module.exports = initializeDeck;