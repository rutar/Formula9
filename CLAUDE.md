# Formula9 — Math Formula Trainer

## Описание
Офлайн PWA-тренажёр математических формул для 9 класса (ГВЭОШ, Эстония).
Работает без сервера, без npm, открытием index.html в браузере.

## Стек
- Vanilla JS (ES2022, ES-модули)
- KaTeX (офлайн, bundled в /lib/)
- MathLive (офлайн, bundled в /lib/)
- CSS3 (Grid + Flexbox, без препроцессоров)
- PWA (Service Worker + manifest.json)
- IndexedDB + localStorage (прогресс)

## Архитектура
- src/data/formulas.js — база формул
- src/modules/ — логика (taskEngine, checker, progress, router)
- src/components/ — UI компоненты
- lib/ — bundled MathLive и KaTeX
- НЕТ сборщика, НЕТ node_modules в рантайме

## Три режима заданий
1. MODE_CHOICE — выбор из 4 вариантов
2. MODE_BLOCKS — сборка из блоков
3. MODE_INPUT — ввод через MathLive

## Запуск
Открыть index.html через Live Preview (VS Code) или:
python -m http.server 8080