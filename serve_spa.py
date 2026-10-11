import http.server
import socketserver
import os

PORT = 4173
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            index_path = os.path.join(path, "index.html") if os.path.isdir(path) else ""
            if not os.path.exists(index_path):
                self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    with socketserver.TCPServer(("0.0.0.0", PORT), SPAHandler) as httpd:
        print(f"Serving SPA on port {PORT}")
        httpd.serve_forever()
