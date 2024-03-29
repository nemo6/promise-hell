function walk_folder(dir,table=[],level=0) {

    let list = fs.readdirSync(dir)
    
    for ( let file of list ){
    
        let pathx = dir + "\\" + file
        let stats = fs.statSync(pathx)
        
        if( stats.isFile() ){
            table.push(pathx)
        }
        else if ( stats.isDirectory() ){
            level++
            walk_folder(pathx,table,level)
        }
    
    }

    return table
}
