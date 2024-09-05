let students = [];
let barChart;
let pieChart;

function handleChange(event) {
  const { name, value } = event.target;
  students = {
    ...students,
    [name]: value
  };
}

function handleClick() {
  const display1=document.querySelectorAll('#graphContainer')[0].style.visibility="visible"
  const display2=document.querySelectorAll('#graphContainer')[1].style.visibility="visible"
  const Name = document.getElementById('name').value;
  const english = parseFloat(document.getElementById('eng').value);
  const math = parseFloat(document.getElementById('math').value);
  const science = parseFloat(document.getElementById('Science').value);
  const hindi = parseFloat(document.getElementById('hindi').value);
  const telugu = parseFloat(document.getElementById('telugu').value);

  const average = (english + math + science + hindi + telugu) / 5;

  const student = {
    Name,
    scores: {
      english,
      math,
      science,
      hindi,
      telugu,
    },
    average
  };

  students.push(student);
  console.log(students);
  updateChart();
}

function updateChart() {
  const names = students.map(student => student.Name);
  const averages = students.map(student => student.average);
  
  const colors = [
    "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"  
  ];

  const barColors = names.map((_, index) => colors[index % colors.length]);
const borderColors = names.map((_, index) => colors[index % colors.length].replace('0.6', '1'));

  const barCanvas = document.getElementById('barChartCanvas');
  const pieCanvas = document.getElementById('pieChartCanvas');

  if (!barCanvas || !pieCanvas) {
    console.error('Canvas element not found');
    return;
  }

  const barCtx = barCanvas.getContext('2d');
  const pieCtx = pieCanvas.getContext('2d');

  if (!barCtx || !pieCtx) {
    console.error('Failed to get canvas context');
    return;
  }

  if (barChart) {
    barChart.destroy();
  }
  if (pieChart) {
    pieChart.destroy();
  }
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Average Score',
        data: averages,
        backgroundColor: barColors, 
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      animation: {
        duration: 6000, 
        easing: 'easeInOutQuint', 
      },
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Students\' Average Scores'
        }
      }
    }
  });

  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: names,
      datasets: [{
        label: 'Average Score Distribution',
        data: averages,
        backgroundColor: barColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      animation: {
        animateScale: true, 
        animateRotate: true, 
        duration: 6000, 
        easing: 'easeInOutQuint', 
      },
      plugins: {
        title: {
          display: true,
          text: 'Distribution of Average Scores'
        }
      }
    }
  });
}
