import { db } from '../firebase/firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const diaryList = document.getElementById('diaryList');

async function loadDiary() {
  diaryList.innerHTML = '';
  const q = query(collection(db, 'diary'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    diaryList.innerHTML = '<p>일기가 없습니다.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const { date, content } = doc.data();
    const item = document.createElement('div');
    item.className = 'diary-entry';
    item.innerHTML = `
      <h4>${date}</h4>
      <p>${content}</p>
      <hr />
    `;
    diaryList.appendChild(item);
  });
}

loadDiary();
