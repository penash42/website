const COLORS  = ["#00ff31", "#0ff", "#69039f", "#ff246f", "#f00", "#f8ff00", "#ff7300"];
const OPACITY = 1;

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
    var height = 100;
    
    $(".timeline-entry").each(function() {
        id = $(this).attr("id");
        delta = id.split(";");
        var monthSplit = perWidth/12;
        if (delta.length == 2)
        {
            // determine start month and year
            var start = delta[0].split("/");
            var startLoc = Math.floor(start[0]*monthSplit + (start[1] - firstYear)*perWidth);
            
            var end, endLoc;
            // determine end month and year
            if (delta[1] == "present")
            {
                endLoc = Math.floor($(".timeline-canvas").width());
            } else
            {
                end = delta[1].split("/");
                endLoc = Math.floor((end[1] - firstYear)*perWidth - startLoc + end[0]*monthSplit);
            }
            
            // draw
            var rectHeight = determineHeight(rectangles, startLoc, startLoc + endLoc, height);
            
            bottom = bottom - rectHeight + 1;
            
            var rectangle = canvas.rect(startLoc, bottom, endLoc, rectHeight).attr({
                'fill': COLORS[rectangles.length],
                'fill-opacity': OPACITY,
                'stroke-width': 1,
                'stroke-opacity': 1
            });
            
            rectangle.mouseover(function () {
                rectangle.stop().animate({transform: "t0, -35", height: rectHeight + 45}, 1, "bounce");
            }).mouseout(function () {
                rectangle.stop().animate({transform: "", height: rectHeight + 1}, 300, "bounce");
            });
            
            rectangle.node.setAttribute("aria-describedby", $(this).attr("aria-describedby"));
            
            $('[aria-describedby]').qtip({
                
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

function determineHeight(rectangles, begin, end, height)
{
    for (rec in rectangles)
    {
        // end == rec.end or begin == rec.begin, reduce height
        if (((end == rectangles[rec].end) || (begin == rectangles[rec].start)) && (height == rectangles[rec].height))
        {
            height -= 15;
        }
        
        // fully contained within, match height
        if ((end < rectangles[rec].end) && (begin > rectangles[rec].start))
        {
            height = rectangles[rec].height;
        }
    }
    return height;
}