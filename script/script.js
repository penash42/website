$( document ).ready( function() {

loadSnippets();

});

function loadSnippets()
{
    $(".snippet").each(function() {
        $(this).load("../snippets/" + $(this).attr('id') + ".html");
    });
}