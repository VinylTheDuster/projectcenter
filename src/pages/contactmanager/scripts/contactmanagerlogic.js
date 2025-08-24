const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');

const submitBtn = document.getElementById('submit');

const defaultContact = {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    number: '123-555-1234',
};

const contactArray = [defaultContact];

submitBtn.addEventListener("click", function() {
    
    if(nameInput.value && emailInput.value && !isNaN(numberInput.value)) {

        contactArray.push({
            name: nameInput.value,
            email: emailInput.value,
            number: numberInput.value,
        })

        nameInput.value = '';
        emailInput.value = '';
        numberInput.value = '';

        contactList();
    } else {

        alert('Please fill in the fields correctly!')
    }
})

const contactList = () => {const html = contactArray.map(c => `
    <div class="contact-item">
                <h1>${c.name}</h1>
                <h2>${c.email}</h2>
                <h3>${c.number}</h3>
            </div>
`).join('');
document.getElementById('contact-show').innerHTML = html;
};

contactList();

