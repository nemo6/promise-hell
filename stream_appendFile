const fs = require("fs")
const es = require("event-stream")

function stream_append(x,m){
	es.readable( function (count, next) {
		for( let v of m ) {
	        this.emit( "data", "\n" + v )
	    }
	    this.emit("end")
	    next()
	}).pipe(fs.createWriteStream(x))
}
