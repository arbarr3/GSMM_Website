Handlebars.registerHelper('equal', (lvalue, rvalue, options) ->
	if arguments.length < 3
		throw new Error("Handlebars Helper equal needs 2 parameters")
	if lvalue!=rvalue
		return options.inverse(this)
	else
		return options.fn(this)
	)

Handlebars.registerHelper('ifBothTrue', (lvalue, rvalue, options) ->
	if arguments.length < 3
		throw new Error("Handlebars Helper ifBothTrue needs 2 parameters")
	if not lvalue and rvalue
		return options.inverse(this)
	else if lvalue.length is 0 or rvalue.length is 0
		return options.inverse(this)
	else
		return options.fn(this)
	)

sectionData = (numToGet, startPos, data) ->
	data[startPos..startPos+numToGet-1]


getData = (url) ->
	rdata = null
	$.ajax
		url: url
		async: false
		dataType: 'json'
		success: (jData) ->
			rdata = jData
	return rdata

#Takes the values in sending and decides which dataSets to pass back
checkSending = (sending, dataSets) ->
	allData = []
	if "missile" in sending
		 $.merge(allData, dataSets.missile)
	if "event" in sending
		$.merge(allData, dataSets.event)
	if "report" in sending
		$.merge(allData, dataSets.report)
	return allData

$(document).ready ->
	TO_DISPLAY = 10
	advertBegin = 0
	advertEnd = 0
	sending = []
	sending.push(window.location.search.substring(1))

	#Main Page Display
	msnData = getData('data/msnData.json')
	$(".classifBanner").html msnData.classification
	appFooterTemplate = require 'views/templates/appFooter'
	$("#appFooter").html(appFooterTemplate(msnData))

	#Getting all of the data into the dataSets js-Obj
	dataSets = {}
	dataSets.missile = getData('data/missiles.json')
	dataSets.event = getData('data/events.json')
	dataSets.report = getData('data/reports.json')
	filters = getData('data/filters.json')

	#Retrieving which data to show
	allData = checkSending(sending, dataSets)

	#Pulling the display window
	sendData = sectionData(TO_DISPLAY, 0, allData)

	#Render advertisements
	listingsTemplate = require 'views/templates/listings'
	missilePartial = require 'views/templates/missile'
	eventPartial = require 'views/templates/event'
	reportPartial = require 'views/templates/report'
	Handlebars.registerPartial 'missile', missilePartial
	Handlebars.registerPartial 'event', eventPartial
	Handlebars.registerPartial 'report', reportPartial
	$("#advertListings").html(listingsTemplate(sendData))

	#Render filter
	filterTemplate = require 'views/templates/filter'
	$("#filter").html(filterTemplate(filters))
	
	#Render Sort Menu
	sortTemplate = require 'views/templates/sort'
	$("#sort").append(sortTemplate(filters))



	#Setting the check-boxes on load (Given to us by the URL)
	for i in sending
		box = $('.filterItem input[value="'+i+'"]')
		box.prop("checked", true)
		$("."+sending+"_sort").show()
		#TODO: Add the .checked class to the divs with checked boxes

	#Showing the position in the list at the bottom of the page
	advertEnd = advertBegin + sendData.length
	$("#info-div").html("Showing "+(advertBegin+1)+" to "+advertEnd+" of "+ allData.length)

	$("#searchField").on('keyup', (event) ->
			#TODO: 
			#	Add the ability to search through multiple labels
			#	Add a lot of error catching for crazy input

			regex = new RegExp($("#searchField").val().toUpperCase())

			key = "label"

			filteredData = _.filter(allData, (datum) ->
					datum[key].toUpperCase().match(regex)
			)

			sendData = sectionData(TO_DISPLAY, 0, filteredData)
			$("#advertListings").html(listingsTemplate(sendData))
			advertEnd = advertBegin + sendData.length
			$("#info-div").html("Showing "+(advertBegin+1)+" to "+advertEnd+" of "+ filteredData.length)
			return false
		)

	$("#next").click( ->
			if(advertBegin + TO_DISPLAY) < allData.length
				advertBegin += TO_DISPLAY

			sendData = sectionData(TO_DISPLAY, advertBegin, allData)
			$("#advertListings").html(listingsTemplate(sendData))
			advertEnd = advertBegin + sendData.length
			$("#info-div").html("Showing "+(advertBegin+1)+" to "+advertEnd+" of "+ allData.length)
			return false
		)

	$("#last").click(->
			if(advertBegin - TO_DISPLAY) > 0
				advertBegin -= TO_DISPLAY
			else
				advertBegin = 0
			sendData = sectionData(TO_DISPLAY, advertBegin, allData)
			$("#advertListings").html(listingsTemplate(sendData))
			advertEnd = advertBegin + sendData.length
			$("#info-div").html("Showing "+(advertBegin+1)+" to "+advertEnd+" of "+ allData.length)
			return false
		)

	$("#ten").click(->
		TO_DISPLAY = 10
		$(this).addClass("selected")
		$("#fifty").removeClass()
		$("#hundred").removeClass()
		$("#last").html("Last 10")
		$("#next").html("Next 10")
		return false
	)

	$("#fifty").click(->
		TO_DISPLAY = 50
		$(this).addClass("selected")
		$("#ten").removeClass()
		$("#hundred").removeClass()
		$("#last").html("Last 50")
		$("#next").html("Next 50")
		return false
	)

	$("#hundred").click(->
		TO_DISPLAY = 100
		$(this).addClass("selected")
		$("#ten").removeClass()
		$("#fifty").removeClass()
		$("#last").html("Last 100")
		$("#next").html("Next 100")
		return false
	)

	$(".filterItem input").click(->
		advertBegin = 0
		sending = []
		$("#filter input").each(->
			if this.checked
				sending.push(this.value)
				$("."+this.id.split("_")[0]+"_sort").show()
			else
				$("."+this.id.split("_")[0]+"_sort").hide()
		)
		allData = checkSending(sending, dataSets)
		sendData = sectionData(TO_DISPLAY, 0, allData)
		$("#advertListings").html(listingsTemplate(sendData))
		advertEnd = advertBegin + sendData.length
		$("#info-div").html("Showing "+(advertBegin+1)+" to "+advertEnd+" of "+ allData.length)
	)

	counter = 0
	$("section").on("click", "a.info", ->
		#	The divs would keep disappearing before the rollup so I put them into a function
		#		and now I call this function with the window.setTimeout delay on them.
		callThem = ->
			$("article#"+IDs[0]+" div.inner").removeClass("less")
			$("article#"+IDs[0]+" div.holder").addClass("bdiv").removeClass("holder")
			$("article#"+IDs[0]+" div.bdiv img.down").show()
			
			$("#"+IDs[0]+" div.subC").html("")


		moreOrLess = $(this).html()
		IDs = this.id.split("_")
		subs = []
		jQObjs = $(".subC")
		subCnum = jQObjs.length
		
		for i in [0..subCnum-1]
			subCDivIds = jQObjs[i].id.split("_")
			if subCDivIds[0] is IDs[0]
				subs.push(subCDivIds)
		
		if moreOrLess is "More Info"
			if $("#"+IDs[0]+" div.subC").html() is ""

				found = []
				for sub in subs
					for data of dataSets
						found.push(_.filter(dataSets[data], (datum) -> datum if datum.id is sub[1]))
					found = _.flatten(found)
				
				for i in found 
					for j in subs
						if i.id is j[1]
							$("article#"+IDs[0]+" div.bdiv img.down").hide()
							$("article#"+IDs[0]+" div.bdiv").addClass("holder").removeClass("bdiv")
							$("article#"+IDs[0]+" div.inner").addClass("less")

							insert = $("#"+IDs[0]+"_"+i.id+"_"+j[2])
							insert.html(listingsTemplate([i])).hide()
							#insert.show("slide", {direction: "up"}, 1000)
							insert.slideDown(750)
							insert.attr('id', insert.attr('id')+counter)
							counter++
							$("a#"+this.id+".info").html("Less Info").removeClass("more")

				

		else if moreOrLess is "Less Info"
			$("#"+IDs[0]+" div.subC").slideUp(750)
			window.setTimeout(callThem, 750)

			$("a#"+this.id+".info").html("More Info").addClass("more")

		return false
	)

	$("#selectSort").change(->
		console.log $("#selectSort option:selected").attr("value")


	)
	