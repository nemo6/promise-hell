async function walk_count(dir) {

	let n = 0
	let list = await fs.promises.readdir(dir)

	for ( let file of list ){

		let pathx = dir + "/" + file

		let stats = await fs.promises.stat(pathx)

		if ( stats.isDirectory() ){

			n++
			n += await walk_count(pathx)
		}
	
	}

	return n

}

async function walk_folder(dir,obj={}) {

	// let table = []

	let list = await fs.promises.readdir(dir)

	for ( let file of list ){

		let pathx = dir + "/" + file

		let stats = await fs.promises.stat(pathx)

		if ( stats.isFile() && path.extname(file) == ".js" ) {

			let ext = path.extname(file).slice(1)

			if( obj[ext] == undefined ) obj[ext]=[]

			// obj[ext].push() // table.push()

			obj[ext].push([
				file,
				stats.size,
				formatBytes(stats.size),
				pathx,
				b2(stats.mtime),
				await count_line(pathx),
			])

		}else if ( stats.isDirectory() ){

			 await walk_folder(pathx,obj)

			// table=table.concat( await walk_folder(pathx,obj) )

		}

	}

	return obj

}

function count_line(x){
	let count = 1
	return new Promise( (resolve,reject) => {
		fs.createReadStream(x)
		.on("data", chunk => {
		for ( let i=0;i<chunk.length;i++ ) if (chunk[i] == 10) count++
		})
		.on("end", () => resolve(count) )
	})
}
