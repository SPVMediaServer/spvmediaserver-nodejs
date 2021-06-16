# spvmediaserver-nodejs

Bitcoin media server using nodejs

# How to run
Run the web server from src directory
```
cd src
node server.js  
```

Then browse to http://localhost:8080/demo.html  
Play the video. Diagnostic information will be logged to the node terminal.

# Video content
Media is in src/videos  
.mp4 files should be fragmented into a master manifest file using `ffmpeg`. See ff.sh.  

