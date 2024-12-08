
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var form = this;
    const data = [form.name.value, form.email.value, form.message.value, form.subject.value];

    fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Bạn Đã Gửi Thành Công!');
                form.name.value = null;
                form.email.value = null;
                form.message.value = null;
                form.subject.value = null;
            } else {
                alert('Bạn Đã Gửi Thất Bại');
            }
        });
    
});