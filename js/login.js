import { auth } from '../firebase/firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('error');

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem('admin', 'true');
    window.location.href = 'admin.html';
  } catch (error) {
    console.error(error);
    errorMsg.textContent = '로그인 실패: 이메일 또는 비밀번호를 확인하세요.';
  }
});
