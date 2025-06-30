import { db } from '../firebase/firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const galleryList = document.getElementById('galleryList');

async function loadGallery() {
  galleryList.innerHTML = '';
  const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    galleryList.innerHTML = '<p>등록된 이미지가 없습니다.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const { imageUrl, desc } = doc.data();
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${imageUrl}" alt="image" />
      <p>${desc}</p>
    `;
    galleryList.appendChild(item);
  });
}

loadGallery();
