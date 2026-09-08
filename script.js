'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
matchMedia('(min-width: 981px)').addEventListener('change', closeMenu);

// Demo only: no endpoint, no fetch, no persistence, no submit-type control.
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
function showSampleMessage() {
  status.textContent = 'こちらはリニューアル提案用サンプルのため、現在フォーム送信はできません。入力した内容は送信・保存されていません。';
  status.hidden = false;
  status.focus({ preventScroll: true });
  status.scrollIntoView({ block: 'nearest', behavior: 'auto' });
}
document.querySelector('#sample-submit').addEventListener('click', showSampleMessage);
form.addEventListener('submit', event => {
  event.preventDefault();
  showSampleMessage();
});

const dialog = document.querySelector('#photo-dialog');
const photo = document.querySelector('#dialog-image');
const caption = document.querySelector('#dialog-caption');
let trigger;
document.querySelectorAll('.image-open').forEach(button => {
  button.addEventListener('click', () => {
    trigger = button;
    photo.src = button.dataset.image;
    photo.alt = button.dataset.caption + 'の施工写真（拡大）';
    caption.textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (trigger) trigger.focus({ preventScroll: true });
});
