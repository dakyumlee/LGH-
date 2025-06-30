import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { db, storage } from '../firebase/firebase.js';

if (!sessionStorage.getItem('admin')) {
  alert('접근 권한이 없습니다');
  window.location.href = 'login.html';
}

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const targetId = btn.dataset.tab;
    tabContents.forEach(tc => {
      tc.classList.add('hidden');
      if (tc.id === targetId) tc.classList.remove('hidden');
    });
  });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('admin');
  window.location.href = 'login.html';
});

const blogTitle = document.getElementById('blog-title');
const blogContent = document.getElementById('blog-content');
const blogSubmit = document.getElementById('blog-submit');
const blogList = document.getElementById('blog-list');

blogSubmit.addEventListener('click', async () => {
  const title = blogTitle.value.trim();
  const content = blogContent.value.trim();
  if (!title || !content) return;
  await addDoc(collection(db, 'blog'), {
    title,
    content,
    createdAt: serverTimestamp()
  });
  blogTitle.value = '';
  blogContent.value = '';
  loadBlogList();
});

async function loadBlogList() {
  blogList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'blog'));
  snapshot.forEach(docSnap => {
    const { title, content } = docSnap.data();
    const div = document.createElement('div');
    div.className = 'blog-item';
    div.innerHTML = `
      <h3 contenteditable="true">${title}</h3>
      <p contenteditable="true">${content}</p>
      <button onclick="deleteBlog('${docSnap.id}')">삭제</button>
      <button onclick="editBlog(this, '${docSnap.id}')">수정</button>
    `;
    blogList.appendChild(div);
  });
}

window.deleteBlog = async (id) => {
  await deleteDoc(doc(db, 'blog', id));
  loadBlogList();
};

window.editBlog = async (btn, id) => {
  const item = btn.parentElement;
  const newTitle = item.querySelector('h3').innerText;
  const newContent = item.querySelector('p').innerText;
  await updateDoc(doc(db, 'blog', id), {
    title: newTitle,
    content: newContent
  });
};

loadBlogList();

const galleryFile = document.getElementById('gallery-file');
const galleryDesc = document.getElementById('gallery-desc');
const gallerySubmit = document.getElementById('gallery-submit');
const galleryList = document.getElementById('gallery-list');

gallerySubmit.addEventListener('click', async () => {
  const file = galleryFile.files[0];
  const desc = galleryDesc.value.trim();
  if (!file || !desc) return;
  const fileRef = ref(storage, `gallery/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  await addDoc(collection(db, 'gallery'), {
    desc,
    imageUrl: url,
    filename: file.name,
    createdAt: serverTimestamp()
  });
  galleryFile.value = '';
  galleryDesc.value = '';
  loadGallery();
});

async function loadGallery() {
  galleryList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'gallery'));
  snapshot.forEach(docSnap => {
    const { imageUrl, desc, filename } = docSnap.data();
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${imageUrl}" width="150" />
      <p>${desc}</p>
      <button onclick="deleteGallery('${docSnap.id}', '${filename}')">삭제</button>
    `;
    galleryList.appendChild(div);
  });
}

window.deleteGallery = async (id, filename) => {
  const fileRef = ref(storage, `gallery/${filename}`);
  await deleteObject(fileRef);
  await deleteDoc(doc(db, 'gallery', id));
  loadGallery();
};

loadGallery();

const timelineTitle = document.getElementById('timeline-title');
const timelineContent = document.getElementById('timeline-content');
const timelineSubmit = document.getElementById('timeline-submit');
const timelineList = document.getElementById('timeline-list');

timelineSubmit.addEventListener('click', async () => {
  const title = timelineTitle.value.trim();
  const content = timelineContent.value.trim();
  if (!title || !content) return;
  await addDoc(collection(db, 'timeline'), {
    title,
    content,
    createdAt: serverTimestamp()
  });
  timelineTitle.value = '';
  timelineContent.value = '';
  loadTimeline();
});

async function loadTimeline() {
  timelineList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'timeline'));
  snapshot.forEach(docSnap => {
    const { title, content } = docSnap.data();
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <h3 contenteditable="true">${title}</h3>
      <p contenteditable="true">${content}</p>
      <button onclick="deleteTimeline('${docSnap.id}')">삭제</button>
      <button onclick="editTimeline(this, '${docSnap.id}')">수정</button>
    `;
    timelineList.appendChild(div);
  });
}

window.deleteTimeline = async (id) => {
  await deleteDoc(doc(db, 'timeline', id));
  loadTimeline();
};

window.editTimeline = async (btn, id) => {
  const item = btn.parentElement;
  const newTitle = item.querySelector('h3').innerText;
  const newContent = item.querySelector('p').innerText;
  await updateDoc(doc(db, 'timeline', id), {
    title: newTitle,
    content: newContent
  });
};

loadTimeline();

const youtubeUrl = document.getElementById('youtube-url');
const youtubeDesc = document.getElementById('youtube-desc');
const youtubeSubmit = document.getElementById('youtube-submit');
const youtubeList = document.getElementById('youtube-list');

youtubeSubmit.addEventListener('click', async () => {
  const videoUrl = youtubeUrl.value.trim();
  const description = youtubeDesc.value.trim();
  if (!videoUrl || !description) return;
  await addDoc(collection(db, 'youtube'), {
    videoUrl,
    description,
    createdAt: serverTimestamp()
  });
  youtubeUrl.value = '';
  youtubeDesc.value = '';
  loadYoutube();
});

function extractYoutubeId(url) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

async function loadYoutube() {
  youtubeList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'youtube'));
  snapshot.forEach(docSnap => {
    const { videoUrl, description } = docSnap.data();
    const videoId = extractYoutubeId(videoUrl);
    const div = document.createElement('div');
    div.className = 'youtube-item';
    div.innerHTML = `
      <iframe width="300" height="170" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      <p>${description}</p>
      <button onclick="deleteYoutube('${docSnap.id}')">삭제</button>
    `;
    youtubeList.appendChild(div);
  });
}

window.deleteYoutube = async (id) => {
  await deleteDoc(doc(db, 'youtube', id));
  loadYoutube();
};

loadYoutube();

const diaryDate = document.getElementById('diary-date');
const diaryContent = document.getElementById('diary-content');
const diarySubmit = document.getElementById('diary-submit');
const diaryList = document.getElementById('diary-list');

diarySubmit.addEventListener('click', async () => {
  const date = diaryDate.value;
  const content = diaryContent.value.trim();
  if (!date || !content) return;
  await addDoc(collection(db, 'diary'), {
    date,
    content,
    createdAt: serverTimestamp()
  });
  diaryDate.value = '';
  diaryContent.value = '';
  loadDiary();
});

async function loadDiary() {
  diaryList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'diary'));
  const docs = snapshot.docs.sort((a, b) => {
    return a.data().date < b.data().date ? 1 : -1;
  });
  docs.forEach(docSnap => {
    const { date, content } = docSnap.data();
    const div = document.createElement('div');
    div.className = 'diary-item';
    div.innerHTML = `
      <h4 contenteditable="true">${date}</h4>
      <p contenteditable="true">${content}</p>
      <button onclick="deleteDiary('${docSnap.id}')">삭제</button>
      <button onclick="editDiary(this, '${docSnap.id}')">수정</button>
    `;
    diaryList.appendChild(div);
  });
}

window.deleteDiary = async (id) => {
  await deleteDoc(doc(db, 'diary', id));
  loadDiary();
};

window.editDiary = async (btn, id) => {
  const item = btn.parentElement;
  const newDate = item.querySelector('h4').innerText;
  const newContent = item.querySelector('p').innerText;
  await updateDoc(doc(db, 'diary', id), {
    date: newDate,
    content: newContent
  });
};

loadDiary();

const guestbookList = document.getElementById('guestbook-list');

async function loadGuestbook() {
  guestbookList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'guestbook'));
  const docs = snapshot.docs.sort((a, b) => {
    const aTime = a.data().createdAt?.seconds || 0;
    const bTime = b.data().createdAt?.seconds || 0;
    return bTime - aTime;
  });
  docs.forEach(docSnap => {
    const { name, message, createdAt } = docSnap.data();
    const date = createdAt?.toDate().toLocaleString('ko-KR') ?? '작성일 없음';
    const div = document.createElement('div');
    div.className = 'guestbook-item';
    div.innerHTML = `
      <p><strong>${name}</strong> (${date})</p>
      <p>${message}</p>
      <hr />
    `;
    guestbookList.appendChild(div);
  });
}

loadGuestbook();
