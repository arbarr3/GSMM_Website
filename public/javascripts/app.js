(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"scripts/listings": function(exports, require, module) {
  var checkSending, getData, sectionData,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3) {
      throw new Error("Handlebars Helper equal needs 2 parameters");
    }
    if (lvalue !== rvalue) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper('ifBothTrue', function(lvalue, rvalue, options) {
    if (arguments.length < 3) {
      throw new Error("Handlebars Helper ifBothTrue needs 2 parameters");
    }
    if (!lvalue && rvalue) {
      return options.inverse(this);
    } else if (lvalue.length === 0 || rvalue.length === 0) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  sectionData = function(numToGet, startPos, data) {
    return data.slice(startPos, +(startPos + numToGet - 1) + 1 || 9e9);
  };

  getData = function(url) {
    var rdata;
    rdata = null;
    $.ajax({
      url: url,
      async: false,
      dataType: 'json',
      success: function(jData) {
        return rdata = jData;
      }
    });
    return rdata;
  };

  checkSending = function(sending, dataSets) {
    var allData;
    allData = [];
    if (__indexOf.call(sending, "missile") >= 0) {
      $.merge(allData, dataSets.missile);
    }
    if (__indexOf.call(sending, "event") >= 0) {
      $.merge(allData, dataSets.event);
    }
    if (__indexOf.call(sending, "report") >= 0) {
      $.merge(allData, dataSets.report);
    }
    return allData;
  };

  $(document).ready(function() {
<<<<<<< HEAD
    var TO_DISPLAY, advertBegin, advertEnd, allData, appFooterTemplate, box, counter, dataSets, eventPartial, filterTemplate, filters, i, listingsTemplate, missilePartial, msnData, reportPartial, sendData, sending, sortTemplate, _i, _len;
=======
    var TO_DISPLAY, advertBegin, advertEnd, allData, appFooterTemplate, counter, dataSets, eventPartial, filterTemplate, filters, i, listingsTemplate, missilePartial, msnData, reportPartial, sendData, sending, _i, _len;
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
    TO_DISPLAY = 10;
    advertBegin = 0;
    advertEnd = 0;
    sending = [];
    sending.push(window.location.search.substring(1));
    msnData = getData('data/msnData.json');
    $(".classifBanner").html(msnData.classification);
    appFooterTemplate = require('views/templates/appFooter');
    $("#appFooter").html(appFooterTemplate(msnData));
    dataSets = {};
    dataSets.missile = getData('data/missiles.json');
    dataSets.event = getData('data/events.json');
    dataSets.report = getData('data/reports.json');
    filters = getData('data/filters.json');
    allData = checkSending(sending, dataSets);
    sendData = sectionData(TO_DISPLAY, 0, allData);
    listingsTemplate = require('views/templates/listings');
    missilePartial = require('views/templates/missile');
    eventPartial = require('views/templates/event');
    reportPartial = require('views/templates/report');
    Handlebars.registerPartial('missile', missilePartial);
    Handlebars.registerPartial('event', eventPartial);
    Handlebars.registerPartial('report', reportPartial);
    $("#advertListings").html(listingsTemplate(sendData));
    filterTemplate = require('views/templates/filter');
    $("#filter").html(filterTemplate(filters));
<<<<<<< HEAD
    sortTemplate = require('views/templates/sort');
    $("#sort").append(sortTemplate(filters));
    for (_i = 0, _len = sending.length; _i < _len; _i++) {
      i = sending[_i];
      box = $('.filterItem input[value="' + i + '"]');
      box.prop("checked", true);
      $("." + sending + "_sort").show();
    }
    advertEnd = advertBegin + sendData.length;
=======
    advertEnd = advertBegin + sendData.length;
    for (_i = 0, _len = sending.length; _i < _len; _i++) {
      i = sending[_i];
      $('#filter input[value="' + i + '"]').prop("checked", true);
    }
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
    $("#info-div").html("Showing " + (advertBegin + 1) + " to " + advertEnd + " of " + allData.length);
    $("#searchField").on('keyup', function(event) {
      var filteredData, key, regex;
      regex = new RegExp($("#searchField").val().toUpperCase());
      key = "label";
      filteredData = _.filter(allData, function(datum) {
        return datum[key].toUpperCase().match(regex);
      });
      sendData = sectionData(TO_DISPLAY, 0, filteredData);
      $("#advertListings").html(listingsTemplate(sendData));
      advertEnd = advertBegin + sendData.length;
      $("#info-div").html("Showing " + (advertBegin + 1) + " to " + advertEnd + " of " + filteredData.length);
      return false;
    });
    $("#next").click(function() {
      if ((advertBegin + TO_DISPLAY) < allData.length) {
        advertBegin += TO_DISPLAY;
      }
      sendData = sectionData(TO_DISPLAY, advertBegin, allData);
      $("#advertListings").html(listingsTemplate(sendData));
      advertEnd = advertBegin + sendData.length;
      $("#info-div").html("Showing " + (advertBegin + 1) + " to " + advertEnd + " of " + allData.length);
      return false;
    });
    $("#last").click(function() {
      if ((advertBegin - TO_DISPLAY) > 0) {
        advertBegin -= TO_DISPLAY;
      } else {
        advertBegin = 0;
      }
      sendData = sectionData(TO_DISPLAY, advertBegin, allData);
      $("#advertListings").html(listingsTemplate(sendData));
      advertEnd = advertBegin + sendData.length;
      $("#info-div").html("Showing " + (advertBegin + 1) + " to " + advertEnd + " of " + allData.length);
      return false;
    });
    $("#ten").click(function() {
      TO_DISPLAY = 10;
      $(this).addClass("selected");
      $("#fifty").removeClass();
      $("#hundred").removeClass();
      $("#last").html("Last 10");
      $("#next").html("Next 10");
      return false;
    });
    $("#fifty").click(function() {
      TO_DISPLAY = 50;
      $(this).addClass("selected");
      $("#ten").removeClass();
      $("#hundred").removeClass();
      $("#last").html("Last 50");
      $("#next").html("Next 50");
      return false;
    });
    $("#hundred").click(function() {
      TO_DISPLAY = 100;
      $(this).addClass("selected");
      $("#ten").removeClass();
      $("#fifty").removeClass();
      $("#last").html("Last 100");
      $("#next").html("Next 100");
      return false;
    });
<<<<<<< HEAD
    $(".filterItem input").click(function() {
=======
    $("#filter input").click(function() {
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
      advertBegin = 0;
      sending = [];
      $("#filter input").each(function() {
        if (this.checked) {
<<<<<<< HEAD
          sending.push(this.value);
          return $("." + this.id.split("_")[0] + "_sort").show();
        } else {
          return $("." + this.id.split("_")[0] + "_sort").hide();
=======
          return sending.push(this.value);
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
        }
      });
      allData = checkSending(sending, dataSets);
      sendData = sectionData(TO_DISPLAY, 0, allData);
      $("#advertListings").html(listingsTemplate(sendData));
      advertEnd = advertBegin + sendData.length;
      return $("#info-div").html("Showing " + (advertBegin + 1) + " to " + advertEnd + " of " + allData.length);
    });
    counter = 0;
<<<<<<< HEAD
    $("section").on("click", "a.info", function() {
=======
    return $("section").on("click", "a.info", function() {
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
      var IDs, callThem, data, found, insert, j, jQObjs, moreOrLess, sub, subCDivIds, subCnum, subs, _j, _k, _l, _len1, _len2, _len3, _m, _ref;
      callThem = function() {
        $("article#" + IDs[0] + " div.inner").removeClass("less");
        $("article#" + IDs[0] + " div.holder").addClass("bdiv").removeClass("holder");
        $("article#" + IDs[0] + " div.bdiv img.down").show();
        return $("#" + IDs[0] + " div.subC").html("");
      };
      moreOrLess = $(this).html();
      IDs = this.id.split("_");
      subs = [];
      jQObjs = $(".subC");
      subCnum = jQObjs.length;
      for (i = _j = 0, _ref = subCnum - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
        subCDivIds = jQObjs[i].id.split("_");
        if (subCDivIds[0] === IDs[0]) {
          subs.push(subCDivIds);
        }
      }
      if (moreOrLess === "More Info") {
        if ($("#" + IDs[0] + " div.subC").html() === "") {
          found = [];
          for (_k = 0, _len1 = subs.length; _k < _len1; _k++) {
            sub = subs[_k];
            for (data in dataSets) {
              found.push(_.filter(dataSets[data], function(datum) {
                if (datum.id === sub[1]) {
                  return datum;
                }
              }));
            }
            found = _.flatten(found);
          }
          for (_l = 0, _len2 = found.length; _l < _len2; _l++) {
            i = found[_l];
            for (_m = 0, _len3 = subs.length; _m < _len3; _m++) {
              j = subs[_m];
              if (i.id === j[1]) {
                $("article#" + IDs[0] + " div.bdiv img.down").hide();
                $("article#" + IDs[0] + " div.bdiv").addClass("holder").removeClass("bdiv");
                $("article#" + IDs[0] + " div.inner").addClass("less");
                insert = $("#" + IDs[0] + "_" + i.id + "_" + j[2]);
                insert.html(listingsTemplate([i])).hide();
                insert.slideDown(750);
                insert.attr('id', insert.attr('id') + counter);
                counter++;
                $("a#" + this.id + ".info").html("Less Info").removeClass("more");
              }
            }
          }
        }
      } else if (moreOrLess === "Less Info") {
        $("#" + IDs[0] + " div.subC").slideUp(750);
        window.setTimeout(callThem, 750);
        $("a#" + this.id + ".info").html("More Info").addClass("more");
      }
      return false;
    });
<<<<<<< HEAD
    return $("#selectSort").change(function() {
      return console.log($("#selectSort option:selected").attr("value"));
    });
=======
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
  });
  
}});

window.require.define({"scripts/main": function(exports, require, module) {
  var addBehavior, createContent, data, loadJson;

  data = null;

  loadJson = function() {
    var loadViaSyncAjax, msnData, pltData;
    msnData = null;
    pltData = null;
    loadViaSyncAjax = function(jsonFile) {
      var theData;
      theData = null;
      $.ajax({
        url: jsonFile,
        async: false,
        dataType: 'json',
        success: function(jData) {
          return theData = jData;
        }
      });
      return theData;
    };
    msnData = loadViaSyncAjax('/data/msnData.json');
    pltData = loadViaSyncAjax('/data/platforms.json');
    msnData["platform"] = pltData;
    return data = msnData;
  };

  createContent = function() {
    var appFooterTemplate, appHeaderTemplate, missionInfoTemplate;
    appHeaderTemplate = require('views/templates/mainHeader');
    missionInfoTemplate = require('views/templates/missionInfo');
    appFooterTemplate = require('views/templates/appFooter');
    $(".classifBanner").html(data.classification);
    $("#main header").html(appHeaderTemplate(data));
    $("#missionInfo").html(missionInfoTemplate(data));
    return $("#appFooter").html(appFooterTemplate(data));
  };

  addBehavior = function() {
    var setCurrentMissionInfo, setMissionImageAndText;
    setCurrentMissionInfo = function(missionName, missionHeader, missionImage) {
      return $("#msnInfo, #mainImage").fadeTo(150, 0, function() {
        $("#msnInfo p").html(missionName);
        $("#msnInfo h3").html(missionHeader);
        $("#mainImage").attr("src", missionImage);
        return $("#msnInfo, #mainImage").fadeTo(150, 1);
      });
    };
    setMissionImageAndText = function() {
      $(".msnButton").mouseenter(function() {
        return setCurrentMissionInfo(data.platform.descriptions[this.id].msnInfo, data.platform.descriptions[this.id].msnHeader, data.platform.descriptions[this.id].overlayImg);
      });
      return $(".msnButton").mouseleave(function() {
        return setCurrentMissionInfo(data.gsmmInfo, data.infoHeader, data.gsmmImage);
      });
    };
    return setMissionImageAndText();
  };

  $(document).ready(function() {
    loadJson();
    createContent();
    return addBehavior();
  });
  
}});

window.require.define({"views/templates/appFooter": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n<section>\n  <h3>";
    foundHelper = helpers.header;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.header; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h3>\n  <ul>\n    ";
    stack1 = depth0.links;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n  </ul>\n</section>\n";
    return buffer;}
  function program2(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n    <li><a href=\"";
    foundHelper = helpers.url;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.text;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</a></li>\n    ";
    return buffer;}

    stack1 = depth0.footerItems;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n";
    return buffer;});
}});

window.require.define({"views/templates/classifBanner": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    foundHelper = helpers.classification;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.classification; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    return escapeExpression(stack1);});
}});

window.require.define({"views/templates/event": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<ul>\n	<strong>Launch:</strong>\n	<li>Lat: ";
    stack1 = depth0.launch;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lat;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</li>\n	<li>Long: ";
    stack1 = depth0.launch;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lon;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</li>\n</ul>\n<ul>\n	<strong>Reentry:</strong>\n	<li>Lat: ";
    stack1 = depth0.reentry;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lat;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</li>\n	<li>Long: ";
    stack1 = depth0.reentry;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lon;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</li>\n</ul>\n";
    return buffer;});
}});

window.require.define({"views/templates/filter": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
<<<<<<< HEAD
    buffer += "\n	<div class=\"filterItem\"><input type=\"checkbox\" name=\"filter\" id=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "_box\" value=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\" /><label for=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "_box\">";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</label></div>\n";
    return buffer;}

    stack1 = depth0.filters;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n";
=======
    buffer += "\n	<label>";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</label><input type=\"checkbox\" name=\"filter\" value=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\" /><br>\n";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n	<label>";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</label>\n	<select>\n		<option value=\"az\">A-Z</option>\n		<option value=\"za\">Z-A</option>\n	";
    stack1 = depth0.sortables;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	</select>\n";
    return buffer;}
  function program4(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n		<option value=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</option>\n	";
    return buffer;}

    buffer += "<h3>Filter By:</h3>\n";
    stack1 = depth0.filters;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n<h3>Sort By:</h3>\n";
    stack1 = depth0.filters;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
    return buffer;});
}});

window.require.define({"views/templates/listings": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
    var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n<article id=";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + " class=\"advert\">	\n	<div class=\"inner\">\n		<header>\n			<img class=\"adImg\" src=\"";
    foundHelper = helpers.thumb;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.thumb; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\" />\n			<h1><strong>Name:</strong>";
    foundHelper = helpers.label;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h1>\n		</header>\n		\n		<section>\n			";
    stack1 = depth0.type;
    foundHelper = helpers.equal;
    stack1 = foundHelper ? foundHelper.call(depth0, stack1, "missile", {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "equal", stack1, "missile", {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		  	";
    stack1 = depth0.type;
    foundHelper = helpers.equal;
    stack1 = foundHelper ? foundHelper.call(depth0, stack1, "event", {hash:{},inverse:self.noop,fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equal", stack1, "event", {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		  	";
    stack1 = depth0.type;
    foundHelper = helpers.equal;
    stack1 = foundHelper ? foundHelper.call(depth0, stack1, "report", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equal", stack1, "report", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		</section>\n		";
    stack1 = depth0.children;
    stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	</div>\n	<div class=\"bdiv\">\n		";
    stack1 = depth0.children;
    stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	</div>\n</article>\n";
    return buffer;}
  function program2(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n				";
    stack1 = depth0;
    stack1 = self.invokePartial(partials.missile, 'missile', stack1, helpers, partials);;
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		  	";
    return buffer;}

  function program4(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n				";
    stack1 = depth0;
    stack1 = self.invokePartial(partials.event, 'event', stack1, helpers, partials);;
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		  	";
    return buffer;}

  function program6(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n				";
    stack1 = depth0;
    stack1 = self.invokePartial(partials.report, 'report', stack1, helpers, partials);;
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		  	";
    return buffer;}

  function program8(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n		<section>\n			<a id=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "_more\" class=\"info more\" href=\"#\">More Info</a>\n			";
    stack1 = depth0.children;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program9, data, depth0)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		</section>\n		";
    return buffer;}
  function program9(depth0,data,depth1) {
    
    var buffer = "", stack1;
    buffer += "\n				<div id=\"";
    stack1 = depth1.id;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "_";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + "_child\" class=\"subC\"></div>\n			";
    return buffer;}

  function program11(depth0,data) {
    
    
    return "\n			<br class=\"clear\">\n		";}

  function program13(depth0,data) {
    
    
    return "\n			<img class=\"down\" src=\"images/down-arrow.gif\">\n		";}

    stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n";
    return buffer;});
}});

window.require.define({"views/templates/mainHeader": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<h1>";
    foundHelper = helpers.pageTitle;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.pageTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h1>";
    return buffer;});
}});

window.require.define({"views/templates/missile": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<ul>\n	<strong>Info:</strong>\n	<li>Type: ";
    foundHelper = helpers.missileType;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.missileType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</li>\n	<li>Country: ";
    foundHelper = helpers.country;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.country; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</li>\n</ul>\n<p><strong>Executive Summary:</strong>";
    foundHelper = helpers.execSum;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.execSum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</p>\n";
    return buffer;});
}});

window.require.define({"views/templates/missionInfo": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    buffer += "\n  <li class=\"msnButton\" id=";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + ">";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + "</li> | \n";
    return buffer;}

    buffer += "<img id=\"mainImage\" src=";
    foundHelper = helpers.gsmmImage;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.gsmmImage; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + " alt=\"Mission Image\">\n<ul class=\"buttons\">|\n";
    stack1 = depth0.platform;
    stack1 = stack1 == null || stack1 === false ? stack1 : stack1.missionNames;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>\n<article id=\"msnInfo\">\n  <h3>";
    foundHelper = helpers.infoHeader;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.infoHeader; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h3>\n  <p>";
    foundHelper = helpers.gsmmInfo;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.gsmmInfo; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</p>\n  <br>\n</article>\n";
    return buffer;});
}});

window.require.define({"views/templates/missions": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "";


    return buffer;});
}});

window.require.define({"views/templates/report": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<p><strong>Report Type:</strong>";
    foundHelper = helpers.reportType;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
<<<<<<< HEAD
    buffer += escapeExpression(stack1) + "</p>\n<br>\n<p><strong>Executive Summary:</strong>";
=======
    buffer += escapeExpression(stack1) + "</p>\r\n<br>\r\n<p><strong>Executive Summary:</strong>";
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
    foundHelper = helpers.execSum;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.execSum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</p>";
    return buffer;});
}});

<<<<<<< HEAD
window.require.define({"views/templates/sort": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		";
    stack1 = depth0.sortables;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program2, data, depth0)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	";
    return buffer;}
  function program2(depth0,data,depth1) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n			<option class=\"";
    stack1 = depth1.id;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "_sort sortItem\" value=\"";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</option>\n		";
    return buffer;}

    buffer += "<span>Sort:</span>\n<select id=\"selectSort\">\n	<option value=\"az\">A-Z</option>\n	";
    stack1 = depth0.filters;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</select>";
    return buffer;});
}});

=======
>>>>>>> f2829caf6133dcf1d19721d6b8e650c7008928a9
