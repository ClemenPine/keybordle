import * as board from './board.mjs'

export function update() {
    const plays = parseInt(localStorage.getItem('plays') ?? 0)
    const wins = parseInt(localStorage.getItem('wins') ?? 0)
    const currstreak = parseInt(localStorage.getItem('currentStreak') ?? 0)
    const maxstreak = parseInt(localStorage.getItem('maxStreak') ?? 0)

    document.getElementById('plays').innerHTML = plays
    document.getElementById('wins').innerHTML = Math.round((wins / plays) * 100)
    document.getElementById('currstreak').innerHTML = currstreak
    document.getElementById('maxstreak').innerHTML = maxstreak

    const last = localStorage.getItem('last')
    const tries = parseInt(localStorage.getItem('tries') ?? 0)

    const won = board.answer === last

    for (let i = 1; i <= 6; i++) {
        const bar = document.getElementById(`bar-${i}`)
        const val = parseInt(localStorage.getItem(`bar-${i}`) ?? 0)

        if (val) {
            const percentage = Math.round((val / plays) * 100)

            bar.innerHTML = val
            bar.style.width = `${percentage}%`
        }
    }

    if (won) {
        const bar = document.getElementById(`bar-${tries}`)

        bar.classList.remove('bg-slate-400')
        bar.classList.add('bg-lime-600')
    }
}

export function countdown() {
    const currentDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const nextDay = (currentDay + 1) * (1000 * 60 * 60 * 24);

    const intervalId = setInterval(() => {
        const timeUntilNextDay = nextDay - Date.now();

        if (timeUntilNextDay < 0) {
            clearInterval(intervalId);
            return;
        }

        document.getElementById('hours').innerHTML = Math.floor(timeUntilNextDay / (1000 * 60 * 60)).toString().padStart(2, '0')
        document.getElementById('minutes').innerHTML = Math.floor((timeUntilNextDay / (1000 * 60)) % 60).toString().padStart(2, '0')
        document.getElementById('seconds').innerHTML = Math.floor((timeUntilNextDay / 1000) % 60).toString().padStart(2, '0')
    }, 1000);
}  