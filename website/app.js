const weatherAPIKey = 'f0ba6c10f03199e4eb34d73c21c9992f&units=imperial';
const weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

document.querySelector('#generate').addEventListener('click', handleButtonClick);

async function handleButtonClick() {
  const zipCode = document.querySelector('#zip').value;
  const userFeelings = document.querySelector('#feelings').value;
  const currentDate = new Date().toLocaleDateString();

  try {
    const weatherData = await fetchWeatherData(weatherBaseURL, zipCode, weatherAPIKey);
    await sendDataToServer('/add', {
      temperature: weatherData.main.temp,
      date: currentDate,
      userResponse: userFeelings
    });
    await refreshUI();
  } catch (error) {
    console.error("حدث خطأ:", error);
  }
}

async function fetchWeatherData(baseURL, zipCode, apiKey) {
  const response = await fetch(`${baseURL}${zipCode}&appid=${apiKey}`);
  if (!response.ok) throw new Error('شبكة غير مستقرة أو خطأ في الخادم');
  return response.json();
}

async function sendDataToServer(endpoint, data) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('خطأ في إرسال البيانات إلى الخادم');
  return response.json();
}

async function refreshUI() {
  const response = await fetch('/all');
  if (!response.ok) throw new Error('خطأ في جلب البيانات');
  const data = await response.json();
  
  document.querySelector('#date').textContent = `Date: ${data.date}`;
  document.querySelector('#temp').textContent = `Temperature: ${data.temperature}`;
  document.querySelector('#content').textContent = `Feelings: ${data.userResponse}`;
}
