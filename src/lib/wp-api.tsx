const PUBLISHED_WRITING_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/published_writing?per_page=100';
const ABOUT_CONTENT_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/pages/37?_embed';
const CONTACT_CONTENT_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/pages/138?_embed';
const PODCAST_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/podcast';
const CONFERENCE_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/speaking';
const FOOTER_URL = 'http://cms.hollyburns.com/wp-json/wp/v2/footer';

// Cache WordPress responses and revalidate them at most once a minute (ISR).
const REVALIDATE_SECONDS = 60;

export async function fetchAboutPageContent() {
  const content = await fetch(ABOUT_CONTENT_URL, { next: { revalidate: REVALIDATE_SECONDS } });
  return content.json();
}

export async function fetchPublishedStories() {
  const content = await fetch(PUBLISHED_WRITING_URL, { next: { revalidate: REVALIDATE_SECONDS } });
  return content.json();
}

export async function fetchContactPageContent() {
  const content = await fetch(CONTACT_CONTENT_URL, { next: { revalidate: REVALIDATE_SECONDS } });
  return content.json();
}
