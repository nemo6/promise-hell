async function walk_count(dir) {

	let n = 0
	let list = await fs.promises.readdir(dir)

	for ( let file of list ){

		let pathx = dir + "\\" + file

		let stats = await fs.promises.stat(pathx)

		if ( stats.isDirectory() ){

			n++
			n += await walk_count(pathx)
		}
	
	}

	return n

}
