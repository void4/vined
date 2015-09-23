import web
from tempfile import NamedTemporaryFile
import ipfsApi

ipfs = ipfsApi.Client("127.0.0.1", 5001)

urls = ("/", "index")
app = web.application(urls, globals(), True)
render = web.template.render("")

class index:
  def GET(self):
    return render.index()
    
  def POST(self):
    i = web.input()
    if "blob" in i.keys():
      ntf = NamedTemporaryFile()
      ntf.write(i["blob"])
      ntf.flush()
      # use python-magic or native mimetype library? -> check for magic number etc.
      #hash=ipfs.add(ntf.name)
      #XXX DANGEROUS! print(hash)
      ntf.close()
    raise web.seeother("/")

if __name__ == "__main__":
  app.run()
