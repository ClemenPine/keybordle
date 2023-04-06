import {LAYOUTS, NAMES} from './layouts.mjs'

const FINGERMAP = [
    0, 1, 2, 3, 3, 6, 6, 7, 8, 9,
    0, 1, 2, 3, 3, 6, 6, 7, 8, 9,
    0, 1, 2, 3, 3, 6, 6, 7, 8, 9,
]

export let answer

function random(seed) {
    const x = Math.sin(seed++) * 10_000
    return x - Math.floor(x)
}

export function init() {    
    const olds = parseInt(localStorage.getItem('day') ?? 0)
    const seed = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) - 19452

    if (olds != seed) {
        localStorage.setItem('tries', 0)
        localStorage.setItem('last', '')
        localStorage.setItem('day', seed)
    }

    const index = Math.round(random(seed) * NAMES.length)

    answer = NAMES[index]
}

export function load(name) {
    const layout = LAYOUTS[name]

    let target = {} 
    for (let i=0; i < LAYOUTS[answer].length; i++) {
        target[LAYOUTS[answer][i]] = i
    }
    
    const cells = document.getElementById('grid').children
    
    for (const cell of cells) {
        cell.classList.remove('text-slate-700')
        cell.classList.remove('border-2')
        cell.classList.remove('bg-slate-400')
        cell.classList.remove('bg-yellow-500')
        cell.classList.remove('bg-lime-600')
    }
    
    let greens = 0
    for (let i=0; i < layout.length; i++) {
        const ch = layout[i]
        
        let color
        if (i == target[ch]) {
            color = 'bg-lime-600'
            greens++
        } else if (FINGERMAP[i] == FINGERMAP[target[ch]]) {
            color = 'bg-yellow-500'
        } else {
            color = 'bg-slate-400'
        }
        
        cells[i].innerHTML = ch.toUpperCase()
        
        cells[i].classList.add(color)
        cells[i].classList.add('text-slate-100')
    }

    return greens == 30
}