import { db } from '../firebase/firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const blogList = document.getElementById('blogList');

async function loadBlogs() {
  blogList.innerHTML = '';
  const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    blogList.innerHTML = '<p>글이 없습니다.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const { title, content } = doc.data();
    const div = document.createElement('div');
    div.className = 'blog-post';
    div.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
      <hr/>
    `;
    blogList.appendChild(div);
  });
}

loadBlogs();
