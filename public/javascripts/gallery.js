(function ($) {
  'use strict';

  $.fn.thumGallery = function (options) {
    var settings = $.extend({
      url: ''
    }, options),
    $this = $(this),
    getConvertText = function (text) {
      var str = text.substr(0, 10);
      return str;
    },
    getImage = function (url) {

    },
    getGallery = function (json) {
      for(var n in json) {
        // name, text, img, user name,
        $this.find('a').eq(n).attr({'href': 'gallery.php?id=' + json[n].Id});
        $this.find('img').eq(n).attr({'src': json[n].Url});
        $this.find('img').eq(n).after('<span>' + getConvertText(json[n].CreateTime) + '</span>');
      }
    };

    $.ajax({
      async: true,
      url: settings.url,
      type: 'GET',
      dataType: 'json'
    }).done(function (json) {
      getGallery(json);
    }).fail(function () {
    }).always(function () {
    });

    return this;
  };
}(jQuery));

$(function () {
  var url = "//myzoo.azurewebsite.net/gallery";
  $('#gallery').thumGallery({'url': url});
});