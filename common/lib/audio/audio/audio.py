import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment


class AudioXBlock(XBlock):
    display_name = String(
        help="The name students see. This name appears in the course ribbon and as a header for the audio.",
        display_name="Component Display Name",
        default="Audio",
        scope=Scope.settings
    )
    src = String(
        scope=Scope.settings,
        help="URL for MP3 file to play"
    )

    def resource_string(self, path):
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        html = self.resource_string("static/html/audio.html")
        frag = Fragment(html.format(display_name=self.display_name, src=self.src))
        frag.add_css(self.resource_string("static/css/audio.css"))
        return frag

    def studio_view(self, context):
        html = self.resource_string("static/html/audio_edit.html")
        frag = Fragment(html.format(display_name=self.display_name, src=self.src))

        frag.add_css(self.resource_string("static/css/audio_edit.css"))

        js = self.resource_string("static/js/src/audio_edit.js")
        frag.add_javascript(js)
        frag.initialize_js('AudioEditBlock')

        return frag

    def student_view_data(self, context=None):
        return {
            "src": self.src,
        }

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        self.display_name = data.get('display_name')
        self.src = data.get('src')

        return {'result': 'success'}

    @staticmethod
    def workbench_scenarios():
        return [
            ("AudioXBlock",
             """<vertical_demo>
                  <audio src="http://localhost/Ikea.mp3"> </audio>
                  <audio src="http://localhost/skull.mp3"> </audio>
                  <audio src="http://localhost/monkey.mp3"> </audio>
                </vertical_demo>
             """),
        ]
