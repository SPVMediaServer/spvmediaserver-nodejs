#ffmpeg -i bunny.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls index.m3u8
ffmpeg -i bunny.mp4 \
        -profile:v baseline -level 3.0 \
        -map 0:0 -map 0:1 -map 0:0 -map 0:1 \
        -s:v:0 640x360 -c:v:0 libx264 -b:v:0 365k \
        -s:v:1 960x540 -c:v:1 libx264 -b:v:1 2000k \
        -c:a copy \
        -var_stream_map "v:0,a:0 v:1,a:1" \
        -master_pl_name bunny.m3u8 \
        -f hls -hls_time 6 -hls_list_size 0 \
        -hls_segment_filename "v%v/fileSequence%d.ts" \
        v%v/prog_index.m3u8
