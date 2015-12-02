
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
    vars months[12] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (var year = delta[0]; i <= delta[1]; i++)
    {
        baseInnerHtml += "<ul id='" + id + "_" + year + "'>" +  + "</>";
        for (var month = 1; month <= 12; month++)
        {
            
        }
    }
});

// pop ups