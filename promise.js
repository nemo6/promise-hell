( async () => {

v = await walk_folder("test2")
console.log(v)

})()

function walk_folder(dir,table=[],level=0) {

  return new Promise( (resolve,reject) => {
  level++
  fs.readdir( dir, (err,list) => {

    list.forEach( file => {

      let pathx = dir + '\\' + file

      n=0;loop=0

      fs.stat( pathx, (err,stats) => {
        
        if( n == 0 )
		table.push("\t".repeat(level)+path.basename(dir))

        if ( stats.isDirectory() ){
          
          n++
          loop++
          resolve(walk_csv(pathx,table,level))
          
        }

        if( stats.isFile() ){

          n++
          table.push(pathx)
          
        }

        // console.log(pathx,n,list.length,loop,`[${level}]`)
        if( n == list.length && loop == 0 )
        resolve(table)
        
      })

    })

  })
  })

}
