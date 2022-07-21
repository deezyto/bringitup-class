
export default class Form {
  constructor ({parentSelector = null} = {}) {
    this.form = document.querySelectorAll('form');
  }

  validateFormInput(form) {
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        console.log('input');
        if (input.type === 'text' && input.name !== 'phone') {
          const filterValue = input.value.replace(/[^a-z]/g, '');
          input.value = filterValue;

        } else if (input.type === 'email') {
          const filterValue = input.value.replace(/[^a-z0-9.@]/g, '');
          input.value = filterValue;

        } else if (input.name === 'phone') {
          const phoneMask = '+1 ___ ___ ____';
          let currentPhoneMask = '+1 ___ ___ ____';

          //USA Phone Mask +1 234a 738b 2453c
          //користувач вводить цифру, спочатку ми її перевіряєм
          //якщо вона не підходить повідомляєм йому і в input записуєм
          //теперішню маску з правильними цифрами, якщо підходить то до
          //тепереішньої маски з правильними цифрами додаємо ще одну і записуєм
          //її в input

          //номер має починатись на цифру 1
          //перша цифра з трьох має бути від 2-9 (a, b)
          //друга та треті цифри не можуть бути 11 (a, b)
        }
      });
    });
  }

  render() {
    console.log(this.form);
    this.validateFormInput(this.form[0])
  }
}