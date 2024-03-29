const PUBLISHED_WRITING_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/published_writing?per_page=100';
const ABOUT_CONTENT_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/pages/37';
const PODCAST_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/podcast';
const CONFERENCE_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/speaking';
const FOOTER_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/footer';

function addPublishedPieces(data) {
	let contentTemplate = getTemplate('#site-section');
	let writingPieceListItemTemplate = getTemplate('#published-piece-template');
	let result = new Promise((resolve, reject) => {});

	Object.keys(data).sort((a, b) => { return data[b].length - data[a].length }).forEach((category) => {
		let sectionTemplate = contentTemplate.cloneNode(true);
		sectionTemplate.innerHTML = sectionTemplate.innerHTML.replace('{{title}}', category);
		let items = [];
		let pieces = data[category];

		// Sort the pieces by date, descending
		pieces.sort((a, b) => {
			return new Date(b.date_published) - new Date(a.date_published);
		});
		
		pieces.forEach((item) => {
			let template = writingPieceListItemTemplate.cloneNode(true);
			let templateString = template.innerHTML
			templateString = templateString.replace('{{title}}', item.title.rendered);
			templateString = templateString.replace('{{url}}', item.url);
			templateString = templateString.replace('{{publication}}', item.publication);
			template.innerHTML = templateString
			sectionTemplate.querySelector('.writing-links').appendChild(template);
		});
		
		document.querySelector('#dynamic-content').appendChild(sectionTemplate);
		
	});

	return new Promise((resolve, reject) => {
		return resolve();
	});
}

function addAboutContent(data) {
	document.querySelector('#about').innerHTML = data.content.rendered;
} 

function addPodcastContent(data) {
	let podcastList = document.querySelector('#podcasts .writing-links')
	let items = [];
	data.forEach((item) => {
		let element = document.createElement('li')
		let date = new Date(item.release_date).getFullYear()
		let link = item.episode_url
		let podcastTitle = item.podcast_title
		element.innerHTML = `In ${date} I was a guest on <a href="${link}" target="new">${podcastTitle}</a>`
		items.push(element);
	});
	items.forEach((item) => {
		podcastList.appendChild(item)
	});
}

function addSpeakingContent(data) {
	let speakingList = document.querySelector('.speaking-links')
	data = data.sort((a, b) => {
		return new Date(b.talk_date) - new Date(a.talk_date)
	})

	data.forEach((item) => {
		let element = document.createElement('li')
		let date = new Date(item.talk_date)
		let formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
		let template = `${item.conference_name} ("${item.name_of_talk}," ${formattedDate})`;
		element.innerHTML = template
		speakingList.appendChild(element)
	})
}

function addFooterContent(data) {
	let footerSection = document.querySelector('.footer');
	data.forEach((item) => {
		let footerTitle = document.createElement('h1');
		footerTitle.classList.add('section-title');
		footerTitle.innerHTML = item.title.rendered;
		footerParagraph = document.createElement('p');
		footerParagraph.innerHTML = item.content.rendered;
		footerSection.appendChild(footerTitle);
		footerSection.appendChild(footerParagraph);
	});
}

function sortByCategory(data) {
	let categories = {};
	data.forEach((item) => {
		let category = item.category;
		if( !categories.hasOwnProperty(category) ) { categories[category] = []}
		categories[category].push(item);
	});
	return categories;
}

function getTemplate(id) {
	let template = document.querySelector(id);
	return template.content.firstElementChild.cloneNode(true);
}

function getPublishedWriting() {
	return fetch(PUBLISHED_WRITING_URL)
		.then((response) => response.json())
		.then((data) => {
			let sortedPieces = sortByCategory(data);
			addPublishedPieces(sortedPieces);
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				resolve();
			})
		});
}

function getAboutContent() {
	return fetch(ABOUT_CONTENT_URL)
		.then((response) => response.json())
		.then((data) => {
			addAboutContent(data);
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				resolve();
			})
		});
}

function getPodcastAppearances() {
	return fetch(PODCAST_URL)
		.then((response) => response.json())
		.then((data) => {
			addPodcastContent(data);
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				resolve();
			});
		});
}

function getSpeakingAppearances() {
	return fetch(CONFERENCE_URL)
		.then((response) => response.json())
		.then((data) => {
			addSpeakingContent(data);
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				resolve();
			});
		});
}

function getFooter() {
	return fetch(FOOTER_URL)
		.then((response) => response.json())
		.then((data) => {
			addFooterContent(data);
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				resolve();
			});
		});
}

Promise.all([getAboutContent(), getPublishedWriting(), getPodcastAppearances(), getSpeakingAppearances(), getFooter()])
	.then(() => {
		document.body.classList.remove('loading');
	});
