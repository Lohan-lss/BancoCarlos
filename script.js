const btnLogin = document.getElementById('btn-login');
const popupBg = document.getElementById('popup-bg');
const popupClose = document.getElementById('popup-close');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnCadastrar = document.getElementById('btn-cadastrar');
const btnLoginForm = document.getElementById('btn-login-form');
const btnRecuperarSenha = document.getElementById('btn-recuperar-senha');

// Função para validar formato de email simples
function validaEmail(email) {
  // Regex simples para validar email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Atualiza estado dos botões e bordas com base nas validações
function atualizarEstadoBotoes() {
  const emailValido = validaEmail(emailInput.value.trim());
  const senhaValida = passwordInput.value.length >= 8;

  // Validação visual do input email
  if(emailInput.value.trim() === '' || emailValido) {
    emailInput.classList.remove('invalid');
  } else {
    emailInput.classList.add('invalid');
  }

  // Validação visual do input senha
  if(passwordInput.value.length === 0 || senhaValida) {
    passwordInput.classList.remove('invalid');
  } else {
    passwordInput.classList.add('invalid');
  }

  // Habilita "Cadastrar" e "Login" se email valido e senha com 8+
  if(emailValido && senhaValida) {
    btnCadastrar.disabled = false;
    btnLoginForm.disabled = false;
  } else {
    btnCadastrar.disabled = true;
    btnLoginForm.disabled = true;
  }

  // Habilita "Recuperar senha" se email válido preenchido
  btnRecuperarSenha.disabled = !(emailValido && emailInput.value.trim() !== '');
}

// Abrir pop-up
  btnLogin.addEventListener('click', () => {
  popupBg.style.display = 'flex';
  btnLogin.setAttribute('aria-expanded', 'true');
  emailInput.focus();
  // Reset estados (opcional ao abrir)
  btnCadastrar.disabled = true;
  btnLoginForm.disabled = true;
  btnRecuperarSenha.disabled = true;
  emailInput.classList.remove('invalid');
  passwordInput.classList.remove('invalid');
  emailInput.value = '';
  passwordInput.value = '';
});

// Fechar pop-up
function closePopup() {
  popupBg.style.display = 'none';
  btnLogin.setAttribute('aria-expanded', 'false');
  btnLogin.focus();
}

popupClose.addEventListener('click', closePopup);

// Fechar ao clicar fora do pop-up
popupBg.addEventListener('click', (e) => {
  if (e.target === popupBg) {
    closePopup();
  }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popupBg.style.display === 'flex') {
    closePopup();
  }
});

// Verifica inputs e atualiza botões a cada input
emailInput.addEventListener('input', atualizarEstadoBotoes);
passwordInput.addEventListener('input', atualizarEstadoBotoes);

// Prevenir envio do formulário (exemplo)
document.querySelector('#popup form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login enviado (em demonstração).');
});

// Ações placeholders para botões
btnCadastrar.addEventListener('click', () => {
  alert('Ação de cadastro (em demonstração).');
});
btnRecuperarSenha.addEventListener('click', () => {
  alert('Ação de recuperar senha (em demonstração).');
});
