;(function(window) {
'use strict';

function resize_sections() {
  var $el = $(".section_block");
  var _height = $(window).height();
  // adjust to show a teaser
  _height = Math.round(_height - _height * .2);

  $el.css("height", _height + "px");
}

function listen_buttons($el) {
  $el.on("click", function(e) {
    e.preventDefault();
    console.log("now show the popover box");
    var html = templates.buy_modal({});
    $(".buy_modal_box").html($(html));
  });

  $(".buy_modal_box a.close_modal").on("click", function(e) {
    e.preventDefault();
    $(".buy_modal_box").html("");
  });
}

// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

function enable_carousel($el) {
  // $el
  if($el.length > 1) {
    // for loop 
    console.log("enable for loop");
  }
  /**
    is this one element or several?
    get a list of images
    make sure the loaded one is displayed
      parse the data tags
      build array of images
      display little circle icons based on total number
      when user clicks circles or on the image itself -> next
      when at end, start over (infinite)
  */
  var $img = $el.find("img.is_carousel");
  var attr_data = $img.data();  
  var pics = filter_pics( $img.attr("src"), attr_data );
  // build the little circles
  var html = templates.image_carousel({
    pics:pics
  });
  // YUCK! i fucking hate this... i want to keep my elem reference, but also update it and not lose my "place"
  // every dom search is stateless though..
  var $elem = $img.replaceWith( $(html) );
  $el.find("img").first().css("display","block");
  $el.on("click", ".carousel_item", next_photo);
  $el.on("click", ".carousel_selectors li.small_circle", next_photo_by_selector);
  // $el.find(".carousel_selectors li").eq(0).addClass("selected");
  select_circle($el, 0);
}

function select_circle($p, idx) {
  console.log("select_circle", $p, idx);
  var $all_li = $p.find(".carousel_selectors li");
  // $all_li.eq(idx).addClass("selected");
  $all_li.removeClass("selected");
  $all_li.eq(idx).addClass("selected");  
}

function next_photo_by_selector() {
  var $this = $(this);
  var $p = $this.parents(".image_carousel_box");
  var $all_img = $p.find(".carousel_holder");
  var $all_li = $p.find(".carousel_selectors li");
  console.log("$all_li", $all_li);
  
  var $shown = $all_img.find("img:visible");
  var indx_img = $all_img.find("img").index($shown);
  var indx = $all_li.index( this );
  console.log("on element", indx_img, indx, $all_img, $shown);
  if(indx !== indx_img) {
    // actually change the image here!
    $shown.css("display", "none");
    $all_img.find("img").eq(indx).css("display", "block");
    // $all_li.removeClass("selected");
    // $all_li.eq(indx).addClass("selected");
    select_circle($p, indx);
    // also update the circle now!
  }
  
  /**
    show a single photo
  */
}

function next_photo() {
  var $this = $(this);
  var $p = $this.parents(".image_carousel_box");
  var $shown = $p.find(".carousel_holder").find("img:visible");
  $shown.css("display", "none");
  var $next = $shown.next();

  if(!$next.length) {
    $next = $p.find(".carousel_holder img").first();
  }
  $next.css("display", "block");
  var $found = $p.find("img:visible");
  var idx = $p.find("img").index($found);
  // $p.find(".carousel_selectors li").remove
  select_circle($p, idx);
}

/**
  ordered pics array
*/
function filter_pics(img_src, obj) {
  var pics = [];
  var pics_order = [];
  pics.push(img_src);
  for(var k in obj) {
    if(/pic/.test(k)) {
      pics_order.push(k);
    }
  }
  pics_order.sort();
  _.each(pics_order, function(item, idx) {
    pics.push( obj[item] );
  });  
  return pics;
}

function init() {
  console.log("main.index.js");

  enable_carousel($(".carousel_container"));
  // resize_sections();
  listen_buttons($(".section1 .buy_link"));
  // $(window).resize(function() {
  //   resize_sections();
  // });
}

init();

})(window);