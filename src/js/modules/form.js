
export default class Form {
  constructor ({parentSelector = null} = {}) {
    this.form = document.querySelectorAll('form');
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
            return '1';
          } else if (val.charAt(1) === '1' && i === 1 || val.charAt(4) === '1' && i === 4) {
            i++;
            return '';
          } else if (val.charAt(2) === '1' && val.charAt(3) === '1' && i === 3 || val.charAt(5) === '1' && val.charAt(6) === '1' && i === 6) {
            i++;
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
          //let valueFilter = input.value;
          //input.value = valueFilter;

          //console.log(valueFilter.replace(/[^0-9]/g, ''));

          //console.log(/[^0-9]/ig.test(valueFilter));
          /* if (/[^0-9]/g.test(input.value)) {
            input.value = input.value.replace(/[^0-9]/g, '');
          } */ 
          this.mask('[name="phone"]');
          /* input.value = currentPhoneMask.replace(/./g, function (a) {
            console.log(input.value, 'input')
            if (/[_\d]/.test(a) && item < valueFilter.length) {
              console.log(a, item);
              return valueFilter[item++];
            } else if (item >= currentPhoneMask.length) {
              return '';
            } else {
              return a;
            }
          
          }); */


          
          

          //console.log(input.value = maskTemplate);

          /* let checkNumber = valueFilter.replace(/./g, function (a) {
            if (valueFilter.indexOf(a) === 0) {
              console.log(a, 'number');
              if (a !== 1) {
                return 1;
              }
            } else {
              return a;
            }
            
            console.log(a, valueFilter.indexOf(a));
          });
          console.log(checkNumber); */

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