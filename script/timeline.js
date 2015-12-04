const COLORS  = ["#000000", "red", "blue", "green", "purple", "yellow", "orange", "pink"];
const OPACITY = .8;

$( document ).ready(function() {
    var id = $(".timeline-base").attr("id");
    
    // Determine length of time
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
    var firstYear = delta[0];
    var lastYear = delta[1];
    
    // Create the list elements for each year
    var baseInnerHtml = "";
    //var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var totalYears = 0;
    for (var year = delta[0]; year <= delta[1]; year++)
    {
        if (year == delta[1])
        {
            // We want the last element to not have a border-right
            baseInnerHtml += "<li class='timeline-base-year timeline-base-year-last'>" + year + "</li>\r\n";
        } else
        {
            baseInnerHtml += "<li class='timeline-base-year'>" + year + "</li>\r\n";
        }
        totalYears += 1;
    }
    
    // Add the li's to the html
    $(".timeline-base").html(baseInnerHtml);
    
    // Set the width of each li to be equal
    var totalWidth = $(".timeline-base").width();
    var perWidth = (totalWidth/totalYears) - 5;
    $(".timeline-base-year").width(perWidth);
    
    // add the graphics
    var canvas = new Raphael(document.getElementById('canvas_container'), $(".timeline-canvas").width(), $(".timeline-canvas").height());
    var rectangles = [];
    
    var bottom = $(".timeline-canvas").height();
    var height = 75;
    
    $(".timeline-entry").each(function() {
        id = $(this).attr("id");
        delta = id.split(";");
        var monthSplit = perWidth/12;
        if (delta.length == 2)
        {
            // determine start month and year
            var start = delta[0].split("/");
            var startLoc = start[0]*monthSplit + (start[1] - firstYear)*perWidth;
            
            var end, endLoc;
            // determine end month and year
            if (delta[1] == "present")
            {
                endLoc = $(".timeline-canvas").width();
            } else
            {
                end = delta[1].split("/");
                endLoc = (end[1] - firstYear)*perWidth - startLoc + end[0]*monthSplit;
            }
            
            // draw
            var rectHeight = height;
            while (willCauseCollision(rectangles, startLoc, startLoc + endLoc, rectHeight))
            {
                rectHeight += 25;
            }
            
            bottom = bottom - rectHeight - 1;
            var rectangle = canvas.rect(startLoc, bottom, endLoc, rectHeight).attr({fill: COLORS[rectangles.length], opacity: OPACITY}).mouseover(function () {
                rectangle.stop().animate({transform: "t-50, -50"}, 500, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, 500, "elastic");
                txt.stop().animate({opacity: 0}, 500);
            });
            rectangles.push({
                start: startLoc,
                end: endLoc + startLoc,
                height: rectHeight
            });
            bottom = $(".timeline-canvas").height();
        }
    });
    
});

function willCauseCollision(rectangles, begin, end, height)
{
    for (rec in rectangles)
    {
        if (begin >= rectangles[rec].start && begin < rectangles[rec].end
            && height == rectangles[rec].height ) 
        {
            return true;
        } else if (begin <= rectangles[rec].start && end > rectangles[rec].start
            && height == rectangles[rec].height)
        {
        
            return true;
        } else if (begin >= rectangles[rec].start && end <= rectangles[rec].end
            && height == rectangles[rec].height)
        {
        
            return true;
        }
    }
    return false;
}

// pop ups