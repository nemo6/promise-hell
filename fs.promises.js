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

async function walk_obj(dir,n,obj={}) {
  let list = await fs.promises.readdir(dir)
  for ( let file of list ){
    let pathx = dir + "/" + file
    let stats = await fs.promises.stat(pathx)
    if ( stats.isFile() && path.extname(file) == ".js" ) {
  	let ext = path.extname(file).slice(1)
    if( obj[ext] == undefined )
      obj[ext]=[]
      obj[ext].push([
        file,
        stats.size,
        pathx,
        await count_line(pathx)
      ])
    }else if ( stats.isDirectory() ){
      await walk_folder(pathx,n,obj)
    }
  }
  return obj
}

async function walk_table(dir,n,table=[]) {
    let list = await fs.promises.readdir(dir)
    for ( let file of list ){
      let pathx = dir + "/" + file
      let stats = await fs.promises.stat(pathx)
      if ( stats.isFile() && path.extname(file) == ".js" ) {
        let ext = path.extname(file).slice(1)
        table.push([
          file,
          stats.size,
          pathx,
          await count_line(pathx)
        ])
      }else if ( stats.isDirectory() ){
        table.concat( await walk_folder(pathx,n,table) )
      }
    }
    return table
}

String.prototype.head = async function(n){
	let p = []
	let h = []
	let count = 0
	for await ( const chunk of fs.createReadStream(this.valueOf()) ){
	  if( count >= 1 ) break
	  count++
	  for ( let i=0;i<n;i++ ){
	    if( i == 0 ) h.push( chunk[i] )
	    p.push( chunk[i] )
	  }
	}
	return [p,h]
}
