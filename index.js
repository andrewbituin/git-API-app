'use strict';

const url = 'https://api.github.com';
const apiKey = '';

function handleUserSubmit(){
	$('form').on('submit', function(event){
		event.preventDefault();
		const userInput = $('.js-user-input').val();
		getGitHandleRequest(userInput);
	});
}

function getGitHandleRequest(userName){
	const params = {
		userName
	};
	
	const queryString = formatQueryString(params);
	const uri = `${url}${queryString}`;

	fetch(uri)
		.then(response => response.json())
		.then(data => displayResults(data));
}

function displayResults(dataInput){
	const resultsHTML = dataInput.map(item => 
		`
		<li>
		Username: ${item.owner.login}<br>
		Repo Name: ${item.name}<br>
		URL: ${item.url}
		</li>
		`);
	$('.js-results').html(resultsHTML);
}

function formatQueryString(paramsObj){
	const paramsKeys = Object.keys(paramsObj)
		.map(function(key){
			return `/users/${paramsObj[key]}/repos`;
		});
	return paramsKeys;
}

function main(){
	handleUserSubmit();
}

$(main);