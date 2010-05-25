/*
    Marky, the markup toolbar builder

    Usage:
    <script type="text/javascript">
        MarkupEditor.button(['name', 'image',
                             'open tag', 'close tag',
                             'default text']);

        MarkupEditor.button([
            ['name', 'image', 'open tag', 'close tag', 'default text'],
            ...
        ]);
    </script>
*/

var Marky = {
    _hookedReady: false,
    _buttons: [],

    toolbar: '.forum-editor-tools',
    textarea: '#reply-content, #id_content',

    button: function(btnData) {
        if($.isArray(btnData[0])) {
            this._buttons = $.merge(this._buttons, btnData);
        } else {
            this._buttons.push(btnData);
        }

        this._onReady();
    },

    _onReady: function() {
        if(!this._hookedReady) {
            $($.proxy(this._init, this));
            this._hookedReady = true;
        }
    },

    _init: function() {
        if($(this.toolbar).length) {
            var self = this;
            $.each(this._buttons, function() {
                var button = this;
                var tag = $('<img class="markup-toolbar-button" />');
                tag.attr({src: this[1], title: this[0], alt: this[0]})
                   .click(function(e) { self._click(button); })
                   .appendTo(self.toolbar);
            });
        }
    },

    _click: function(button) {
        var textarea = $(this.textarea)[0];
        textarea.focus();

        if(document.selection && document.selection.createRange) {
            // IE/Opera
            var range = document.selection.createRange();

            var selText = range.text;
            if(!selText.length)
                selText = button[4];

            range.text = button[1] + selText + button[2];

            if(range.moveStart) {
                range.moveStart('character', (-1 * button[2].length) - selText.length);
                range.moveEnd('character', (-1 * button[3].length));
            }

            range.select();
        } else if(textarea.selectionStart || textarea.selectionStart == '0') {
            // Firefox/Safari/Chrome/etc.
            var selStart = textarea.selectionStart;
            var selEnd = textarea.selectionEnd;

            var selText = textarea.value.substring(selStart, selEnd);
            if(!selText.length)
                selText = button[4];

            textarea.value =
                textarea.value.substring(0, textarea.selectionStart) +
                button[2] + selText + button[3] +
                textarea.value.substring(textarea.selectionEnd);

            textarea.selectionStart = selStart + button[2].length;
            textarea.selectionEnd = textarea.selectionStart + selText.length;
        }
    }
};

Marky.button([
    ['Bold', '/media/img/markup/text_bold.png', "'''", "'''", 'bold text'],
    ['Italic', '/media/img/markup/text_italic.png', "''", "''", 'italic text'],
    ['Article Link', '/media/img/markup/page_link.png', '[[', ']]', 'Knowledge Base Article'],
    ['External Link', '/media/img/markup/world_link.png', '[http://example.com ', ']', 'external link'],
    ['Numbered List', '/media/img/markup/text_list_numbers.png', '# ', '', 'Numbered list item'],
    ['Bulleted List', '/media/img/markup/text_list_bullets.png', '* ', '', 'Bulleted list item']
]);