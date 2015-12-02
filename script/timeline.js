
// creates the base line markers inside .timeline-base
$( document ).ready(function() {
    var id = $(".timeline-base").attr("id");
    var delta = id.split(";");
    if ((delta.length == 2) && ((delta[0] === "present") || (delta[1] === "present" )))
    {
        var date = new Date();
        var currYear = date.getFullYear();
        if (delta[0] === "present")
        {
            delta[0] = currYear;
        }
        
        if (delta[1] === "present")
        {
            delta[1] = currYear;
        }
    }
    
    var baseInnerHtml = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var year = delta[0]; year <= delta[1]; year++)
    {
        baseInnerHtml += "<li id='" + year + "'>" + year + "\r\n";
        for (var month = 0; month < 12; month++)
        {
            baseInnerHtml += "<div class='timeline-baseinner' id='" + year + "_" + months[month] + "'>" + months[month] + "</div>\r\n"
        }
        baseInnerHtml += "</li>\r\n";
    }
    
    $(".timeline-base").html(baseInnerHtml);
});

// pop ups