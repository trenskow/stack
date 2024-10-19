export default (stack) => {
	return (stack || (new Error()).stack)
		.split('\n')
		.map(line => line.trim())
		.slice(stack ? 1 : 2)
		.map((line) => {
			return /^at ((.*?)(?: \[as (.*?)\])? \((.*?):([0-9]+):([0-9]+)\)|(.*?):([0-9]+):([0-9]+))$/.exec(line);
		})
		.filter(line => line)
		.map((line) => {
			return {
				function: line[3] || line[2] || line[7],
				file: line[4],
				line: parseInt(line[5] || line[8]),
				character: parseInt(line[6] || line[9])
			};
		});
};
