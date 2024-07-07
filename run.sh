#!/usr/bin/env bash

# Start the Rust backend
/usr/local/bin/backend &

# Start nginx to serve the React app
nginx -g 'daemon off;'
