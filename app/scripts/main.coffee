data = null

loadJson = ->
	msnData = null
	pltData = null

	loadViaSyncAjax = (jsonFile) ->
		theData = null
		$.ajax( url: jsonFile, async: false, dataType: 'json', success: (jData) -> theData = jData)
		return theData

	msnData = loadViaSyncAjax '/data/msnData.json'
	pltData = loadViaSyncAjax '/data/platforms.json'
	msnData["platform"] = pltData
	data = msnData

createContent = ->
	appHeaderTemplate = require 'views/templates/mainHeader'
	missionInfoTemplate = require 'views/templates/missionInfo'
	appFooterTemplate = require 'views/templates/appFooter'
	$(".classifBanner").html data.classification
	$("#main header").html appHeaderTemplate(data)
	$("#missionInfo").html missionInfoTemplate(data)
	$("#appFooter").html appFooterTemplate(data)

addBehavior = ->
	setCurrentMissionInfo = (missionName, missionHeader, missionImage) ->
		$("#msnInfo, #mainImage").fadeTo(150, 0, ->
			$("#msnInfo p").html missionName
			$("#msnInfo h3").html missionHeader
			$("#mainImage").attr("src", missionImage)
			$("#msnInfo, #mainImage").fadeTo(150, 1))

	setMissionImageAndText = ->
		$(".msnButton").mouseenter ->
			setCurrentMissionInfo( data.platform.descriptions[@.id].msnInfo,
			data.platform.descriptions[@.id].msnHeader,
			data.platform.descriptions[@.id].overlayImg)

		$(".msnButton").mouseleave ->
			setCurrentMissionInfo data.gsmmInfo, data.infoHeader, data.gsmmImage

	setMissionImageAndText()

$(document).ready ->
	loadJson()
	createContent()
	addBehavior()