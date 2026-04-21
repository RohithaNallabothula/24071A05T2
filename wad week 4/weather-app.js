var WeatherApp = function() {
    this.apiKey = 'c6705827d574311e59ec976ddceb8b93';  // Replace with your key
    this.chartInstance = null;
    this.initApp();
};

WeatherApp.prototype.initApp = function() {
    var fetchBtn = document.getElementById('fetchBtn');
    var cityInput = document.getElementById('cityInput');
    
    // Traditional function callbacks (Line 32 FIXED)
    if (fetchBtn) {
        fetchBtn.addEventListener('click', this.handleFetchClick.bind(this));
    }
    
    if (cityInput) {
        cityInput.addEventListener('keypress', this.handleKeyPress.bind(this));
    }
    
    // Load Hyderabad by default
    if (cityInput) {
        cityInput.value = 'Hyderabad';
    }
    this.fetchAndDisplayWeather();
};

WeatherApp.prototype.handleFetchClick = function() {
    this.fetchAndDisplayWeather();
};

WeatherApp.prototype.handleKeyPress = function(event) {
    if (event.key === 'Enter') {
        this.fetchAndDisplayWeather();
    }
};

WeatherApp.prototype.fetchWeatherData = function(city) {
    var self = this;
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + 
                 encodeURIComponent(city) + 
                 '&appid=' + this.apiKey + 
                 '&units=metric&cnt=8';
    
    self.showLoading(true);
    
    return fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found: HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            self.showLoading(false);
            return data;
        })
        .catch(function(error) {
            self.showLoading(false);
            self.showError('Error: ' + error.message);
            return null;
        });
};

WeatherApp.prototype.displayWeatherGraph = function(weatherData) {
    var canvas = document.getElementById('weatherChart');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }
    
    var ctx = canvas.getContext('2d');
    
    // Destroy previous chart
    if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
    }
    
    // Extract data with traditional for loop (Line 54 FIXED)
    var labels = [];
    var temperatures = [];
    var list = weatherData.list || [];
    
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var date = new Date(item.dt * 1000);
        labels.push(date.toLocaleString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short'
        }));
        temperatures.push(item.main.temp);
    }
    
    // Create new chart (Line 109 FIXED - no special chars)
    this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature C - ' + (weatherData.city ? weatherData.city.name : 'Unknown'),
                data: temperatures,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature C'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date Time'
                    },
                    ticks: {
                        maxTicksLimit: 8
                    }
                }
            }
        }
    });
    
    this.clearError();
};

WeatherApp.prototype.fetchAndDisplayWeather = function() {
    var cityInput = document.getElementById('cityInput');
    var city = cityInput ? cityInput.value.trim() : '';
    
    if (!city) {
        this.showError('Please enter city name');
        return;
    }
    
    if (this.apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
        this.showError('Set API key in weather-app.js');
        return;
    }
    
    var self = this;
    this.fetchWeatherData(city)
        .then(function(weatherData) {
            if (weatherData && weatherData.list) {
                self.displayWeatherGraph(weatherData);
            }
        });
};

WeatherApp.prototype.showLoading = function(show) {
    var loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.style.display = show ? 'block' : 'none';
    }
};

WeatherApp.prototype.showError = function(message) {
    var errorDiv = document.getElementById('errorMsg');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
};

WeatherApp.prototype.clearError = function() {
    var errorDiv = document.getElementById('errorMsg');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
};

// Initialize when DOM ready (Line 147 FIXED)
function initWeatherApp() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            new WeatherApp();
        });
    } else {
        new WeatherApp();
    }
}

// Auto-start
initWeatherApp();