import { db } from '../firebase/firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const guestName = document.getElementById('guestName');
const guestMessage = document.getElementById('guestMessage');
const guestSubmit = document.getElementById('guestSubmit');
const guestbookList = document.getElementById('guestbookList');

guestSubmit.addEventListener('click', async () => {
  const name = guestName.value.trim();
  const message = guestMessage.value.trim();
  if (!name || !message) return;

  await addDoc(collection(db, 'guestbook'), {
    name,
    message,
    createdAt: serverTimestamp()
  });

  guestName.value = '';
  guestMessage.value = '';
  loadGuestbook();
});

async function loadGuestbook() {
  guestbookList.innerHTML = '';
  const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    guestbookList.innerHTML = '<p>아직 아무도 글을 남기지 않았어요.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const { name, message, createdAt } = doc.data();
    const date = createdAt?.toDate().toLocaleString('ko-KR') ?? '날짜 없음';
    const div = document.createElement('div');
    div.className = 'guestbook-entry';
    div.innerHTML = `
      <p><strong>${name}</strong> (${date})</p>
      <p>${message}</p>
      <hr />
    `;
    guestbookList.appendChild(div);
  });
}

loadGuestbook();
