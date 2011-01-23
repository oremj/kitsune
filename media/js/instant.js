(function(){
    var url, search;
    function instant() {
        $.getJSON(url, {'q': $(search).val(), 'format': 'json'}, updateResults);
    }

    function updateResults(data) {
        var container = $('#home-content'),
            results = $('<ol>'),
            r = data.results;

        if (data.query != $(search).val()) return;

        for(var i=0; i<r.length; i++) {
            var j = $('<li>'),
                l = $('<a>'),
                s = $('<span>');
            $(l).attr('href', r[i].url).text(r[i].title);
            $(s).text(r[i].search_summary);
            $(j).append(l).append(s).addClass(r[i].type);
            $(results).append(j);
        }

        $(container).empty().append(results);
    }

    $(document).ready(function(){
        url = $('body').data('search');
        search = $('#support-search input.text')[0];
        $(search).keyup(instant);
    });
})();
