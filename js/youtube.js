import { db } from '../firebase/firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const youtubeList = document.getElementById('youtubeList');

function extractYoutubeId(url) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

async function loadYoutube() {
  youtubeList.innerHTML = '';
  const q = query(collection(db, 'youtube'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    youtubeList.innerHTML = '<p>등록된 영상이 없습니다.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const { videoUrl, description } = doc.data();
    const videoId = extractYoutubeId(videoUrl);
    const item = document.createElement('div');
    item.className = 'youtube-item';
    item.innerHTML = `
      <iframe width="300" height="170" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      <p>${description}</p>
    `;
    youtubeList.appendChild(item);
  });
}

loadYoutube();
