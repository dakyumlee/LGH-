import { db } from '../firebase/firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const timelineList = document.getElementById('timelineList');

async function loadTimeline() {
  timelineList.innerHTML = '';
  const q = query(collection(db, 'timeline'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    timelineList.innerHTML = '<p>등록된 이벤트가 없습니다.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const { title, content } = doc.data();
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <h4>${title}</h4>
      <p>${content}</p>
      <hr />
    `;
    timelineList.appendChild(item);
  });
}

loadTimeline();
