import {LAYOUTS} from './layouts.mjs'
import * as board from './board.mjs'
import * as statistics from './stats.mjs'

function gameover(hasWon) {
    const plays = parseInt(localStorage.getItem('plays') ?? 0)
    const wins = parseInt(localStorage.getItem('wins') ?? 0)
    const currstreak = parseInt(localStorage.getItem('currentStreak') ?? 0)
    const maxstreak = parseInt(localStorage.getItem('maxStreak') ?? 0)

    const tries = parseInt(localStorage.getItem('tries') ?? 0)

    if (hasWon) {
        localStorage.setItem('wins', wins + 1)

        localStorage.setItem('currentStreak', currstreak + 1)
        localStorage.setItem('maxStreak', Math.max(maxstreak, currstreak + 1))

        const bar = parseInt(localStorage.getItem(`bar-${tries}`) ?? 0)
        localStorage.setItem(`bar-${tries}`, bar + 1)
    }

    localStorage.setItem('plays', plays + 1)
}

function popup() {
    document.getElementById('popup').classList.remove('hidden')

    document.getElementById('about').classList.add('hidden')
    document.getElementById('stats').classList.add('hidden')
}

window.popdown = function () {
    document.getElementById('popup').classList.add('hidden')

    document.getElementById('about').classList.remove('hidden')
    document.getElementById('stats').classList.remove('hidden')
}

window.onload = function() {    
    const guess = document.getElementById('guess')

    guess.addEventListener('keypress', function(event) {
        if (event.key !== 'Enter') {
            return
        }

        event.preventDefault()
        submit()
    })
    
    board.init()
    
    const last = localStorage.getItem('last')
    const tries = parseInt(localStorage.getItem('tries') ?? 0)

    if (last in LAYOUTS) {
        board.load(last)
    }

    statistics.update()
    statistics.countdown()

    if (last === board.answer || tries == 6) {
        stats()
    }
}

window.about = function() {
    popup()
    document.getElementById('about').classList.remove('hidden')
}

window.stats = function() {
    popup()
    document.getElementById('stats').classList.remove('hidden')
}

window.submit = function() {
    const guess = document.getElementById('guess')
    const name = guess.value.toLowerCase().replace(/ /g, '-')

    if (!(name in LAYOUTS)) {
        return
    }
    
    const won = board.load(name)     
    const tries = parseInt(localStorage.getItem('tries') ?? 0)

    localStorage.setItem('tries', tries + 1)
    localStorage.setItem('last', name)

    if (won || tries + 1 == 6) {
        gameover(won)

        statistics.update()
        stats()
    }
}