// loosely based on https://gist.github.com/bnerd/2011232
// requires node.js >= v0.10.0
// assumes that HLS segmenter filename base is 'out'
// and that the HLS playlist and .ts files are in the current directory
// point Safari browser to http://<hostname>:PORT/player.html

var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')
var zlib = require('zlib')

PORT = 8080

http.createServer(function (req, res) {
	var uri = url.parse(req.url).pathname;

    if (uri == '/favicon.ico') {
        console.log(`favicon skipped`)
		res.end()
		return
    }
	else if (uri == '/player.html') {
        console.log(`serving player`)
		res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write('<html><head><title>HLS Player fed by node.js</title></head><body>')
		// res.write('<video src="http://localhost' +
		//     ':' + PORT + '/videos/index.m3u8" controls autoplay>')
		//res.write('<video src="https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8" controls autoplay>')

        res.write('<video id="vid" controls autoplay>')
        //res.write('<source src="http://localhost:8080/videos/index.m3u8" type="application/x-mpegURL">')
        res.write('<source src="https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8" type="application/x-mpegURL">')
		res.write('</video>')

        res.write(`
        <script>
        var videoElement = document.getElementById("vid");
if (videoElement.canPlayType('application/vnd.apple.mpegurl') === "probably" || videoElement.canPlayType('application/vnd.apple.mpegurl') === "maybe"){
    console.log("can play")
}
else{
    console.log("CANNOT PLAY!")
}
</script>`)
        res.write('</body></html>')
		res.end()
		return
	}

	var filename = path.join("./", uri)
    console.log(`filename ${filename}`)
	fs.exists(filename, function (exists) {
		if (!exists) {
			console.log('file not found: ' + filename)
			res.writeHead(404, { 'Content-Type': 'text/plain' })
			res.write('file not found: %s\n', filename)
			res.end()
		} else {
			switch (path.extname(uri)) {
                case '.html':
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    fs.readFile(filename, function (err, contents) {
                        res.end(contents)
                    })
                    break
                case '.js':
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    fs.readFile(filename, function (err, contents) {
                        res.end(contents)
                    })
                    break
                case '.m3u8':
				    fs.readFile(filename, function (err, contents) {
					if (err) {
                        console.log(err)
						res.writeHead(500)
						res.end()
					} else if (contents) {
                        console.log('sending file: ' + filename)
                        // for cors
                        // res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
                        // gzip works if head sent correctly
						var ae = req.headers['accept-encoding'];
						if (ae.match(/\bgzip\b/)) {
							zlib.gzip(contents, function (err, zip) {
								if (err) throw err;
                                res.writeHead(200,
                                    {'Access-Control-Allow-Origin': '*', 
                                    'Content-Type':'application/vnd.apple.mpegurl',
                                    'content-encoding': 'gzip'
                                })
						        res.end(zip)
							})
						} else {
                            res.writeHead(200,
                                {'Access-Control-Allow-Origin': '*', 'Content-Type':'application/vnd.apple.mpegurl'})
                            res.end(contents, 'utf-8')
						}
					} else {
						console.log('emptly playlist')
						res.writeHead(500)
						res.end()
					}
				})
				break
			case '.ts':
				res.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type':
				    'video/MP2T' });
				var stream = fs.createReadStream(filename,
				    { bufferSize: 64 * 1024 })
				stream.pipe(res)
				break
			default:
				console.log('unknown file type: ' +
				    path.extname(uri))
				res.writeHead(500)
				res.end()
			}
		}
	})
}).listen(PORT)
console.log(`Server running at http://localhost:${PORT}/`)
