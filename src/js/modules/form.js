

//Checks the data entered in the input, displays a message 
//if an invalid character is entered, adds the required parameter 
//and the pattern parameter to the specified inputs. Sends data from 
//the form to the server (for the test, the Mamp server is used)
//you can install mamp server, comment the previous const dist, and 
//uncomment the next const dist

export default class Form {
  constructor ({formIndex = 0, typeStyleMessage = 1, requiredInput = null} = {}) {
    this.form = document.querySelectorAll('form')[formIndex];
    this.requiredInput = requiredInput;
    this.typeStyleMessage = typeStyleMessage;
    this.message = {
      loading: 'Data is being sent...',
      success: 'Thank you, we will call you soon!',
      failure: 'Something went wrong...',
      text: 'You must enter letter character',
      email: 'Please enter correct email: name@site.com',
      phone: {
        one: 'The phone number must start with the number 1. Please enter correct phone: +1 (234) 375-2500',
        two: 'The first of the three digits must be in the range 2-9. Please enter correct phone: +1 (234) 375-2500',
        three: 'The last two digits cannot be 11. Please enter correct phone: +1 (234) 375-2500'
      }
    };
    this.path = 'assets/question.php';
    this.currentMessage = null;
  }

  showMessage(message) {
    let style;
    const styleBlue = `
      color: white; border: 1px solid white; 
      border-radius: 5px; width: 335px; 
      font-size: 15px;
      padding: 10px;
      margin-top: 34px;
      box-shadow: 2px 0px 3px green;
    `;
    const styleWhite = `
      color: rgba(0, 0, 0, 0.8); border: 1px solid white; 
      border-radius: 5px; width: 335px; 
      padding: 10px;
      font-size: 15px;
      margin-top: 34px;
      box-shadow: 2px 0px 3px green;
    `;
    if (this.typeStyleMessage === 1) {
      style = styleBlue;
    } else if (this.typeStyleMessage === 2) {
      style = styleWhite;
    }

    if (this.form.parentNode.querySelector('.message')) {
      this.form.parentNode.lastElementChild.textContent = message;
      clearTimeout(this.currentMessage);
        this.currentMessage = setTimeout(() => {
          this.form.parentNode.lastElementChild.remove();
        }, 5000);
    } else {
      const elem = document.createElement('div');
      elem.classList.add('message', 'animated', 'fadeIn');
      elem.style.cssText = style;
      elem.textContent = message;
      this.form.parentNode.appendChild(elem);

      clearTimeout(this.currentMessage);
      this.currentMessage = setTimeout(() => {
        this.form.parentNode.lastElementChild.remove();
      }, 5000);
    }

  }

  removeMessage() {
    if (this.form.parentNode.querySelector('.message')) {
      clearTimeout(this.currentMessage);
      this.form.parentNode.lastElementChild.remove();
    }
  }

  setRequiredToInput() {
    this.form.querySelectorAll('input').forEach(input => {
      if (this.requiredInput === 'all') {
        input.setAttribute('required', 'required');
      } else if (this.requiredInput) {
        let typeCharacter;
        if (this.requiredInput.all) {
          input.setAttribute('required', 'required');
          input.setAttribute('title', 'You must enter more 1 character');
        }
        for (let item in this.requiredInput) {
          if (this.requiredInput[item].type === 'number') {
            typeCharacter = 'digits';
            if (this.requiredInput[item].minLength < 2) {
              typeCharacter = 'digit';
            }
          } else {
            typeCharacter = 'characters';
            if (this.requiredInput[item].minLength < 2) {
              typeCharacter = 'character';
            }
          }

          if (item === input.name) {
            if (this.requiredInput[item].required) {
              input.setAttribute('required', 'required');
            }

            if (this.requiredInput[item].minLength && !this.requiredInput[item].maxLength) {
              input.setAttribute('pattern', `.{${this.requiredInput[item].minLength},}`);
              input.setAttribute('title', `You must enter more ${this.requiredInput[item].minLength} ${typeCharacter}`);
            } else if (!this.requiredInput[item].minLength && this.requiredInput[item].maxLength) {
              input.setAttribute('pattern', `.{0,${this.requiredInput[item].maxLength}}`);
              input.setAttribute('title', `You must enter up to ${this.requiredInput[item].maxLength} ${typeCharacter}`);
            } else if (this.requiredInput[item].minLength && this.requiredInput[item].maxLength) {
              input.setAttribute('pattern', `.{${this.requiredInput[item].minLength},${this.requiredInput[item].maxLength}}`);
              input.setAttribute('title', `You must enter ${this.requiredInput[item].minLength} to ${this.requiredInput[item].maxLength} ${typeCharacter}`);
            }
          }
        }
      }
    });
  }

  mask(selector) {
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
  
      let matrix = '+1(___) ___-____';
      let def = matrix.replace(/\D/g, '');
      let val = self.value.replace(/\D/g, '');
      let i = 0;

      if (def.length >= val.length) {
        val = def;
      }
      
      self.value = matrix.replace(/./g, function(a) {
        if (/[_\d]/.test(a) && i < val.length) {
          return val.charAt(i++);
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

  validateFormInput() {
    this.form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        console.log('input');
        if (input.type === 'text' && input.name !== 'phone') {
          const filterValue = input.value.replace(/[^a-zA-Z]/g, '');
          if (/[^a-zA-Z]/g.test(input.value)) {
            this.showMessage(this.message.text);
          } else {
            this.removeMessage();
          }
          input.value = filterValue;

        } else if (input.type === 'email') {
          const filterValue = input.value.replace(/[^a-zA-Z0-9.@]/g, '');
          if (/[^a-zA-Z0-9.@]/.test(input.value)) {
            this.showMessage(this.message.email);
          } else {
            this.removeMessage();
          }
          input.value = filterValue;

        } else if (input.name === 'phone') {
          this.mask('[name="phone"]');

          const valueInDigits = input.value.replace(/[^0-9]/g, '');
          const filterDigits = input.value.slice(0, input.value.length - 1);

          if (input.value[0] === '1') {
            input.value = '+1';
          } else if (valueInDigits[0] !== '1') {
            input.value = '+1';
            this.showMessage(this.message.phone.one);
          } else if (valueInDigits[1] === '1') {
            input.value = filterDigits;
            this.showMessage(this.message.phone.two);
          } else if (valueInDigits[2] === '1' && valueInDigits[3] === '1') {
            input.value = filterDigits;
            this.showMessage(this.message.phone.three);
          } else if (valueInDigits[4] === '1') {
            input.value = filterDigits;
            this.showMessage(this.message.phone.two);
          } else if (valueInDigits[5] === '1' && valueInDigits[6] === '1') {
            input.value = filterDigits;
            this.showMessage(this.message.phone.three);
          } else {
            this.removeMessage();
          }
        }
      });
    });
  }

  async postData(url, formData) {
    let result = await fetch(url, {
      method: 'POST',
      body: formData
    });
    return await result.text();
  }


  bindFormData() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);

      this.showMessage(this.message.loading);

      this.postData(this.path, formData)
      .then(res => {
        console.log(res);
        this.showMessage(this.message.success);
      })
      .catch(() => {
        this.showMessage(this.message.failure);
      })
      .finally(() => {
        this.form.reset();
      });
    });
  }

  render() {
    this.setRequiredToInput();
    this.validateFormInput();
    this.bindFormData();
  }
}