const PUBLISHED_WRITING_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/published_writing?per_page=100';
const ABOUT_CONTENT_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/pages/37?_embed';
const CONTACT_CONTENT_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/pages/138?_embed';
const PODCAST_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/podcast';
const CONFERENCE_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/speaking';
const FOOTER_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/footer';

export async function fetchAboutPageContent() {
  let content = await fetch(ABOUT_CONTENT_URL);
  return content.json();
}

export async function fetchPublishedStories() {
  let content = await fetch(PUBLISHED_WRITING_URL);
  return content.json();
}

export async function fetchContactPageContent() {
  const content = await fetch(CONTACT_CONTENT_URL);
  return content.json();
}
