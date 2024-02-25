let movieDataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let movieData;

let canvas = d3.select('#canvas');

let drawTreeMap = (data) => {
	let hierarchy = d3
		.hierarchy(movieData)
		.sum((node) => node.value)
		.sort((node1, node2) => node2.value - node1.value);

	let createTreeMap = d3.treemap().size([1000, 600]);
	createTreeMap(hierarchy);
	let movieTiles = hierarchy.leaves();
	let block = canvas
		.selectAll('g')
		.data(movieTiles)
		.enter()
		.append('g')
		.attr('transform', (movie) => `translate(${movie.x0},${movie.y0})`);

	block
		.append('rect')
		.attr('class', 'tile-outline')
		.attr('fill', 'none')
		.attr('stroke', 'white')
		.attr('stroke-width', 3)
		.attr('x', 0.5)
		.attr('y', 0.5)
		.attr('width', (movie) => movie.x1 - movie.x0 - 1)
		.attr('height', (movie) => movie.y1 - movie.y0 - 1);

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
		.attr('width', (movie) => movie.x1 - movie.x0 - 1)
		.attr('height', (movie) => movie.y1 - movie.y0 - 1);

	block
		.append('foreignObject')
		.attr('x', 5)
		.attr('y', 5)
		.attr('width', (movie) => movie.x1 - movie.x0 - 10)
		.attr('height', (movie) => movie.y1 - movie.y0 - 10)
		.append('xhtml:div')
		.style('width', '100%')
		.style('height', '100%')
		.style('overflow-wrap', 'break-word')
		.style('text-align', 'left')
		.html((movie) => movie.data.name);
};

d3.json(movieDataURL).then((data, error) => {
	if (error) {
		console.log(error);
	} else {
		movieData = data;
		drawTreeMap();
	}
});
