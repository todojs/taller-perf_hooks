

# Taller de Performance en Node con perf_hooks



Pablo Almunia
@pabloalmunia
pablo.almunia@corusconsulting.com
Director General de CORUS



29 de mayo de 2019




Emitido en directo por por: www.todojs.com



## Ideas clave

Equilibrio entre los elementos clave:

                                      Funcionalidad
                                           /\
                                          /  \
                                         /    \
                                        /      \
                                       /________\
                            Mantenibilidad    Rendimiento

Tipos de opitimizaciones

- nano optimizaciones : procesos que duran nanosegundos
- micro optimizaciones: procesos que duran microsegundos
- optimizaciones      : procesos que duran milisegundos
- mega optimizaciones : procesos que duran cientos de milisegundos



## perf_hooks

Librería estándar para medir rendimiento que funciona en Node y en los navegadores modernos.

        const {performance, PerformanceObserver} = require('perf_hooks');

        const value = performance.now()

        performance.mark('label mark')

        performance.measure('label measure', 'label mark start', 'label mark end')

        const fn = performance.timerify(fn)

        const obs = new PerformanceObserver((timeline) => {
            obs.disconnect();
            console.log(timeline.getEntries());
        }
        obs.observe({entryTypes: ['...'], bufferd: true});


### Código base para el taller


Clonar:

    git clone https://github.com/todojs/taller-perf_hooks.git

o descargarlo de:

    https://github.com/todojs/taller-perf_hooks











### Ejercicio 1

En el programa Object.keys-vs-for-in.js

- Utilizar performance.now() para medir el tiempo que tarda en ejecutar cada caso.
















### Ejercicio 2

En el programa Object.keys-vs-for-in.js

- Utilizar performance.mark() para medir el tiempo que tarda en ejecutar cada caso.
















### Ejercicio 3

En el programa Object.keys-vs-for-in.js

- Utilizar performance.mark(), performance.measure() y new PerformanceObserver()
  para medir el tiempo que tarda en ejecutar cada caso.















### Ejercicio 4

En el programa Object.keys-vs-for-in.js

- Utilizar performance.mark(), performance.measure() y new PerformanceObserver()
  para medir el tiempo que tarda en ejecutar cada caso.
- Crear un bucle que se ejecuta 100.000 veces para tomar las medidas














### Ejercicio 5

En el programa Object.keys-vs-for-in.js

- Utilizar performance.mark(), performance.measure() y new PerformanceObserver()
  para medir el tiempo que tarda en ejecutar cada caso.
- Crear un bucle que se ejecuta 100.000 veces para tomar las medidas
- Cargar la utilidad const {entriesStatistics} = require ('../utils/perf_utils')
  y utilizar entriesStatistics() para mostrar los resultados.

- Alternativa: incluir otra opción con Object.getOwnPropertyNames()










### Ejercicio 6

En el programa getAllPropertyNames.js

- Utilizar performance.timerify() para medir el tiempo que tarda en ejecutarse
  concat(), filter() y sort().
- Crear un bucle que se ejecuta 20.000 veces para tomar las medidas
- Utilizar entriesStatistics() para mostrar los resultados.


- Alternativa: medir también indexOf()










### Ejercicio 7

En el programa getAllPropertyNames-alternatives.js

- Utilizar performance.timerify() para medir el tiempo que tarda en ejecutarse
  cada una de las alternativas.
- Crear un bucle que se ejecuta 100.000 veces para tomar las medidas
- Utilizar entriesStatistics() para mostrar los resultados.













### Ejercicio 8

(no olvidar hacer npm install)

En el programa uuid-test.js

- Utilizar performance.mark() y performance.measure() para medir el tiempo que
  tarda en ejecutarse cada una de las alternativas.
- Utilizar entriesStatistics() para mostrar los resultados.












### Ejercicio 9

(no olvidar hacer npm install)

En el programa stringify-test.js

- Utilizar performance.timerify() para medir el tiempo que  tarda en ejecutarse
  cada una de las alternativas.
- Utilizar entriesStatistics() para mostrar los resultados.












### Ejercicio 10

En el programa poblacion-por-provincia.js

- Utilizar performance.timerify() para medir el tiempo que  tarda en ejecutarse
  cada una de las alternativas.
- Ejecutar una sóla vez (sin bucle) y mostar con console.log()


- Alternativa: ejecutar en bucle (1000 veces) y mostar con entriesStatistics()

- Extra: buscar otra alternativa de mayor rendimiento






