var stateNames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

var nameConverter = function(obj, abbr) {

	for (var key in obj) {
	var value = obj[key]
    value = obj[abbr]
    }

	return value
}

// log(nameConverter(stateNames, "TX"))


console.log("Hello World")
console.log($)

var apikey = '8bee3c41074d45e4b790bc5fc67e21f6'

var baseUrl = 'http://openstates.org/api/v1/legislators/?apikey='

var fullUrl = baseUrl + apikey

var congressionalPromise = $.getJSON(fullUrl)




var legislatorToHTML = function(legislatorObject) {

	var state = legislatorObject.state.toUpperCase()
	var party = legislatorObject.party.substring(0, 1)

	var newString = '<div class="legislatorContainer"><h2 class="legislatorName">'+ 
	legislatorObject.full_name + 
		'</h2><h3 class="legislatorParty">'+ 
	party + ' - ' + 
	nameConverter(stateNames, state) + '</h3>' +
	
	'<img src="' + legislatorObject.photo_url + '">' + 
		'<ul class="contactList">' + 
	'<li id="emailItem">' + 'email: ' + 
	'<a href="mailto:' + legislatorObject.email + 
	'">' + legislatorObject.email + '</a></li>' + 
		'<li id="websiteItem">' + 'website: ' + 
	'<a href="' + legislatorObject.url + '">' + 
	legislatorObject.url + '</a></li>' + 
		'<li id="phoneItem">' + 'phone: ' + 
	legislatorObject.offices[1].phone + '</li>' + 
		'<li id="addressItem">' + 'address: ' + 
	legislatorObject.offices[1].address + 
		'</li></ul></div>'
	return newString
}

var inputEl = document.querySelector('input[type="text"]')

// var search = function(keyEvent) {

//   var inputEl = keyEvent.srcElement
//   if (keyEvent.keyCode === 13) {
//       var userInput = inputEl.

//       // var newLi = document.createElement('li')
//       // newLi.textContent = userInput
//       // guestListUl.appendChild(newLi)
//       // inputEl.value = ''
//   }  
// }
// inputEl.addEventListener('keydown',addGuest)



var handleData = function(resultArray) {
	var htmlString = ""
	for (var i = 0; i < 10; i ++) {
			console.log(resultArray[i])
			var legislatorObject = resultArray[i]
			htmlString += legislatorToHTML(legislatorObject)
	}
	var	containerEl = document.querySelector("#container")
	containerEl.innerHTML = htmlString

}

congressionalPromise.then(handleData)






