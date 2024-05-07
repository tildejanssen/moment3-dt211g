fetch('https://studenter.miun.se/~mallar/dt211g/')
  .then(response => response.json())
  .then(data => {
    // Behandla datan för kurser
    const coursesData = data.filter(item => item.type === "Kurs") //filtrera objekt efter type "Kurs"
                            .sort((a, b) => b.applicantsTotal - a.applicantsTotal) //sortera kurser efter totalt antal sökande i "fallande" ordning
                            .slice(0, 6); //välj ut 6 kurserna med flest antal sökande
    
    // Behandla datan för program
    const programsData = data.filter(item => item.type === "Program") //filtrera objekt efter type "Program"
                             .sort((a, b) => b.applicantsTotal - a.applicantsTotal) //sortera program efter totalt antal sökande i "fallande" ordning
                             .slice(0, 5); //välj ut 5 programmen med flest antal sökande
    
    // Skapa stapeldiagrammet
    var ctxBar = document.getElementById('barChart').getContext('2d'); //hämta arbetsytans sammanhang för stapeldiagrammet
    var barChart = new Chart(ctxBar, {
        type: 'bar', //välj stapel som diagram
        data: { //datan för diagrammet
            labels: coursesData.map(course => course.name), //ta ut kursnamn för labels
            datasets: [{ //definiera datauppsättningar för diagrammet
                label: 'Totalt antal sökande', //bestäm label
                data: coursesData.map(course => course.applicantsTotal), //ta ut antal sökande för data
                backgroundColor: 'rgb(131, 185, 131)',
                borderColor: 'rgb(53, 79, 53)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Skapa cirkeldiagram
    var ctxPie = document.getElementById('pieChart').getContext('2d');
    var pieChart = new Chart(ctxPie, {
        type: 'pie', //bestäm diagramtyp för cirkel
        data: {
            labels: programsData.map(program => program.name), //ta ut programnamn för labels
            datasets: [{
                label: 'Totalt antal sökande',
                data: programsData.map(program => program.applicantsTotal),
                backgroundColor: [ //färger för varje del i cirkeln
                    'rgba(70, 255, 98, 0.607)',
                    'rgb(70, 215, 255)',
                    'rgb(255, 70, 224)',
                    'rgb(215, 71, 255)',
                    'rgb(255, 140, 114)',
                ],
                borderColor: [
                    'rgba(33, 114, 45, 0.607)',
                    'rgba(54, 162, 235, 1)',
                    'rgb(134, 39, 118)',
                    'rgb(96, 32, 113)',
                    'rgb(118, 64, 52)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            
        }
    });
  })
  .catch(error => console.error('Error fetching data:', error)); //hantera eventuella fel som uppstår
