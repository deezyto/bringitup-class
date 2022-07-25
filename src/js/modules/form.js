
export default class Form {
  constructor ({formIndex = 0, typeStyleMessage = 1} = {}) {
    this.form = document.querySelectorAll('form')[formIndex];
    this.typeStyleMessage = typeStyleMessage;
    this.message = {
      loading: 'Data is being sent...',
      success: 'Thank you, we will call you soon!',
      failure: 'Something went wrong...',
      text: 'You must enter more than 1 letter character',
      email: 'Please enter correct email: name@site.com',
      phone: {
        one: `The phone number must start with the number 1. Please enter correct phone: +1(234) 375-250`,
        two: `The first of the three digits must be in the range 2-9. Please enter correct phone: +1(234) 375-250`,
        three: `The last two digits cannot be 11. Please enter correct phone: +1(234) 375-250`
      }
    };
    this.path = 'assets/question.php';
    this.removeMessage = null;
    this.item = 0;
  }

  showMessage(form, message) {
    this.item = 1;
    let style;
    let styleBlue = `
      color: white; border: 1px solid white; 
      border-radius: 5px; width: 335px; 
      font-size: 15px;
      padding: 10px;
      margin-top: 34px;
      box-shadow: 2px 0px 3px green;
    `;
    let styleWhite = `
      color: white; border: 1px solid white; 
      border-radius: 5px; width: 335px; 
      padding: 10px;
      font-size: 15px;
      margin-top: 34px;
      box-shadow: 2px 0px 3px green;
    `;
    if (this.typeStyleMessage === 1) {
      style = styleBlue;
    } else {
      style = styleWhite;
    }

    if (form.parentNode.querySelector('.message')) {
      form.parentNode.lastElementChild.textContent = message;
      clearTimeout(this.removeMessage);
        this.removeMessage = setTimeout(() => {
          form.parentNode.lastElementChild.remove();
        }, 5000);
    } else {
      const elem = document.createElement('div');
      elem.classList.add('message', 'animated', 'fadeIn');
      elem.style.cssText = style;
      elem.textContent = message;
      form.parentNode.appendChild(elem);

      clearTimeout(this.removeMessage);
      this.removeMessage = setTimeout(() => {
        form.parentNode.lastElementChild.remove();
      }, 5000);
    }

  }

  removeMessageText(form) {
    if (form.parentNode.querySelector('.message') && this.item === 1) {
      clearTimeout(this.removeMessage);
      form.parentNode.lastElementChild.remove();
    }
    this.item = 0;
  }

  mask(selector, form) {
    let global = this;
    
    function setCursorPosition(pos, elem) {
      elem.focus();
  
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
  
    function createMask(event){
      let self = this;

      console.log(self.value, 'value');
  
      let matrix = '+1(___) ___-____';
      let def = matrix.replace(/\D/g, '');
      let val = self.value.replace(/\D/g, '');
      let i = 0;

      if (def.length >= val.length) {
        val = def;
      }
      
      self.value = matrix.replace(/./g, function(a) {
  
        if (/[_\d]/.test(a) && i < val.length) {
          if (val.charAt(0) !== '1' && i === 0) {
            i++;
            global.showMessage(form, global.message.phone.one);
            return '1';
          } else if (val.charAt(1) === '1' && i === 1 || val.charAt(4) === '1' && i === 4) {
            i++;
            global.showMessage(form, global.message.phone.two);
            return '';
          } else if (val.charAt(2) === '1' && val.charAt(3) === '1' && i === 3 || val.charAt(5) === '1' && val.charAt(6) === '1' && i === 6) {
            i++;
            global.showMessage(form, global.message.phone.three);
            return '';
          } else {
            //global.removeMessageText(form);
            return val.charAt(i++);
          }

        } else if (i >= val.length) {
          return '';
        } else {
          return a;
        }
  
      });
  
      if (event.type === 'blur') {
        if (self.value.length === 2) {
          self.value = '';
        }
      } else {
        setCursorPosition(self.value.length, self);
      }
    }
  
    let inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  validateFormInput(form) {
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        console.log('input');
        if (input.type === 'text' && input.name !== 'phone') {
          const filterValue = input.value.replace(/[^a-zA-Z]/g, '');
          input.value = filterValue;

        } else if (input.type === 'email') {
          const filterValue = input.value.replace(/[^a-zA-Z0-9.@]/g, '');
          input.value = filterValue;

        } else if (input.name === 'phone') {
          this.mask('[name="phone"]', form);
        }
      });
    });
  }

  async postData(url, form) {
    let result = await fetch(url, {
      method: 'POST',
      body: form
    });
    return await result.text();
  }


  bindFormData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      this.showMessage(form, this.message.loading, this.typeStyleMessage);

      this.postData(this.path, formData)
      .then(data => {
        console.log(data);
        this.showMessage(form, this.message.success, this.typeStyleMessage);
      })
      .catch(() => {
        console.log('dont send form');
        this.showMessage(form, this.message.failure, this.typeStyleMessage);
      })
      .finally(() => {
        form.reset();
      });
    });
  }

  render() {
    console.log(this.form);
    this.validateFormInput(this.form);
    this.bindFormData(this.form);
  }
}