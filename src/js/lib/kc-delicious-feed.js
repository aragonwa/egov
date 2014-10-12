(function( $ ){

  $.fn.deliciousNewsFeed = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      feedURL      : 'http://feeds.delicious.com/v2/json/kingcounty',
      numItems     : 3,
      title        : 'News',
      titleIcon    : 'fa-file-text-o',
      showSummary  : true,
      allItemsUrl  : 'http://www.kingcounty.gov/about/news/events',
      allItemsText : 'See all King County news'
    }, options);

    //Set global scope for instance
    var $this = this,
        output = "",
        allpops = [];

    return this.each(function() {
      $this.append('<i class="fa fa-spinner fa-spin fa-4x"></i>');
      var dataURL = settings.feedURL + '?count=' + settings.numItems;
      $.ajax({
        url: dataURL,
        dataType: 'jsonp',
        }).
        success(function(data) {
          parseData(data);
        })
    });
      
    function parseData(data) {
      var counter = 0;
      $this.addClass("news-feed");
      $this.addClass("dated-news-feed");

      var output = '<h2><span class=\"fa-stack\"><i class=\"fa fa-square fa-stack-2x\"></i><i class=\"fa ' + settings.titleIcon + ' fa-stack-1x fa-inverse\"></i> </span> '+ settings.title +'</h2>';

      $.each (data, function(i, item) {
        var dateWhole = item.d.split(': ');
        var dateStrSub = dateWhole[0];
        var month = dateStrSub.split(' ')[0].toUpperCase();
        month = month.substring(0,3);
        var day = dateStrSub.split(' ')[1];
        //Start HTML string
        output += '<div class="media"><div class="pull-left">';
        //Get date in Date format
        //Get day
        output +='<div class="date-day">'+ day + '</div>';
        //Get month
        output +='<div class="date-month">'+ month + '</div>';
        output += '</div>';
        //Set content for popover
        var popoverContent = 'Summary: '+ item.n;  
        var titleStr = item.d;
        var titleParts = titleStr.split(': ');
        var titleStrSub = titleParts[1];
        //Get Event name
        output += '<div class="media-body">';
        output +='<a href="'+item.u+'" id="popover'+i+'" rel="popover" data-animation="true" data-html="true" data-placement="right" data-trigger="hover" data-delay="0" data-content="'+ popoverContent +'" title="'+ item.d +'">' + titleStrSub + '</a>';
        if(settings.showSummary) {
          output += '<p>'+item.n+'</p>';
        }
        //Wrap up
        output+='</div></div>';
        allpops.push("#popover"+i)
      });
      output+= '<p><a href="'+settings.allItemsUrl+'"><em>'+settings.allItemsText+'</em></a></p>'
      $this.html(output);
      $(allpops).each(function (index){
        $(allpops).popover();
      });
    }
  };
})( jQuery );