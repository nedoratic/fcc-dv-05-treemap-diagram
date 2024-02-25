let movieDataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let movieData;

let canvas = d3.select('#canvas');

let drawTreeMap = (data) => {
	let hierarchy = d3
		.hierarchy(movieData, (node) => {
			return node.children;
		})
		.sum((node) => node.value)
		.sort((node1, node2) => {
			return node2.value - node1.value;
		});
	console.log(hierarchy.leaves());
	let createTreeMap = d3.treemap().size([1000, 600]);
	createTreeMap(hierarchy);
	let movieTiles = hierarchy.leaves();
	let block = canvas
		.selectAll('g')
		.data(movieTiles)
		.enter()
		.append('g')
		.attr('transform', (movie) => {
			return `translate(${movie.x0}, ${movie.y0})`;
		});
	block
		.append('rect')
		.attr('class', 'tile')
		.attr('fill', (movie) => {
			let category = movie.data.category;
			if (category === 'Action') {
				return '#F09EA7';
			} else if (category === 'Adventure') {
				return '#C0EBC0';
			} else if (category === 'Animation') {
				return '#C7CAFF';
			} else if (category === 'Biography') {
				return '#CDABEB';
			} else if (category === 'Comedy') {
				return '#FAFABD';
			} else if (category === 'Drama') {
				return '#FED6A5';
			} else if (category === 'Family') {
				return '#BDB1FE';
			}
		})
		.attr('data-name', (movie) => movie.data.name)
		.attr('data-category', (movie) => movie.data.category)
		.attr('data-value', (movie) => movie.data.value)
		.attr('width', (movie) => movie.x1 - movie.x0)
		.attr('height', (movie) => movie.y1 - movie.y0);
	block
		.append('text')
		.text((movie) => movie.data.name)
		.attr('x', 5)
		.attr('y', 15);
};

d3.json(movieDataURL).then((data, error) => {
	if (error) {
		console.log(error);
	} else {
		movieData = data;
		console.log(movieData);
		drawTreeMap();
	}
});
