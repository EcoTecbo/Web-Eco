import os
import sys
import http.server
import socketserver
import signal

class EcotaxiHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='/home/z/my-project/out', **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

# Fork to background
pid = os.fork()
if pid > 0:
    import time
    time.sleep(2)
    sys.exit(0)

os.setsid()
signal.signal(signal.SIGHUP, signal.SIG_IGN)

# Change to the output directory so SimpleHTTPRequestHandler serves from there
os.chdir('/home/z/my-project/out')

with ReusableTCPServer(("0.0.0.0", 3000), EcotaxiHandler) as httpd:
    httpd.serve_forever()
