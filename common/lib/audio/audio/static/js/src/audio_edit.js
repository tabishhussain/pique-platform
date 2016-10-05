function AudioEditBlock(runtime, element) {
    var audio_src_is_valid = false;

    function onChangeAudioSrc() {
        if (/\.mp3$/i.test($(element).find('input[name=audio_src]').val())) {
            // valid url
            $('#audio_src_wrapper').removeClass('audio-edit-error');
            audio_src_is_valid = true;
        } else {
            // invalid url
            $('#audio_src_wrapper').addClass('audio-edit-error');
            audio_src_is_valid = false;
        }
    }

    onChangeAudioSrc();
    $(element).on('input', 'input[name=audio_src]', onChangeAudioSrc);

    $(element).find('.save-button').bind('click', function () {
        if (audio_src_is_valid) {
            var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
            var data = {
                display_name: $(element).find('input[name=audio_display_name]').val(),
                src: $(element).find('input[name=audio_src]').val()
            };
            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                window.location.reload(false);
            });
        } else {
            alert('Please enter a valid Audio URL.')
        }
    });

    $(element).find('.cancel-button').bind('click', function () {
        runtime.notify('cancel', {});
    });
}
