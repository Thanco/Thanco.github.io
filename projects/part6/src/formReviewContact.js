const form = document.getElementById('form-review-contact');
const result = document.getElementById('result');

form.onsubmit = async (e) => {
    e.preventDefault();
    result.innerHTML = "Please wait..."
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const submission = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    });

    if (submission.status == 200) {
        result.innerHTML = "Form submitted successfully!";
        setTimeout(() => {
            result.style.display = "none";
        }, 2000);
        return;
    }
    result.innerHTML = "An error occurred while submitting the form. Please try again later.";
};
