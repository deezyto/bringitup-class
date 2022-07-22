
export default class Form {
  constructor ({parentSelector = null} = {}) {
    this.form = document.querySelectorAll('form');
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
  }

  showMessage(typeStyle, form, message) {
    const removeMessage = setTimeout(() => {
      form.parentNode.lastElementChild.remove();
    }, 5000);

    console.log(typeStyle, form, message);
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
    if (typeStyle === 1) {
      style = styleBlue;
    } else {
      style = styleWhite;
    }

    if (form.parentNode.querySelector('.message')) {
      form.parentNode.lastElementChild.textContent = message;
      clearTimeout(removeMessage);
    } else {
      const elem = document.createElement('div');
      elem.classList.add('message', 'animated', 'fadeIn');
      elem.style.cssText = style;
      elem.textContent = message;
      form.parentNode.appendChild(elem);
      console.log(form.parentNode.firstElementChild, 'form.parentNode.firstChild');
      clearTimeout(removeMessage);
      setTimeout(() => {
        form.parentNode.lastElementChild.remove();
      }, 5000);
    }
    console.log(form.parentNode.lastElementChild, 'form.parentNode.lastElementChild');
  }

  mask(selector, form) {
    const showMessage = this.showMessage;
    const message = this.message;

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
  
    function createMask(event) {
  
      let matrix = '+1(___) ___-____';
  
      let i = 0;
  
      let def = matrix.replace(/\D/g, '');
  
      let val = this.value.replace(/\D/g, '');
  
      if (def.length >= val.length) {
        val = def;
      }
      
      this.value = matrix.replace(/./g, function(a) {
  
        if (/[_\d]/.test(a) && i < val.length) {
          if (val.charAt(0) !== '1' && i === 0) {
            i++;
            showMessage(1, form, message.phone.one);
            return '1';
          } else if (val.charAt(1) === '1' && i === 1 || val.charAt(4) === '1' && i === 4) {
            i++;
            showMessage(1, form, message.phone.two);
            return '';
          } else if (val.charAt(2) === '1' && val.charAt(3) === '1' && i === 3 || val.charAt(5) === '1' && val.charAt(6) === '1' && i === 6) {
            i++;
            showMessage(1, form, message.phone.three);
            return '';
          } else {
            return val.charAt(i++);
          }
          
        } else if (i >= val.length) {
          return '';
        } else {
          return a;
        }
  
      });
  
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
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
          const filterValue = input.value.replace(/[^a-z]/g, '');
          input.value = filterValue;

        } else if (input.type === 'email') {
          const filterValue = input.value.replace(/[^a-z0-9.@]/g, '');
          input.value = filterValue;

        } else if (input.name === 'phone') {
          const phoneMask = '+1 ___ ___ ____';
          let currentPhoneMask = '+1 ___ ___ ____';

          let valueFilter = input.value.replace(/[^0-9]/g, '');
          let mask = currentPhoneMask.replace(/[^0-9]/g, '');

          let item = 0;

          if (mask.length >= valueFilter.length) {
            valueFilter = mask;
          }
          
          this.mask('[name="phone"]', form);
       
        }
      });
    });
  }

  render() {
    console.log(this.form);
    this.validateFormInput(this.form[0])
  }
}