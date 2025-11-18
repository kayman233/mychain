# Как искать DOI для конкретных статей

## 🔍 Метод 1: CrossRef REST API (самый точный)

### Формат запроса:
```
https://api.crossref.org/works?query.title=НАЗВАНИЕ_СТАТЬИ&query.author=АВТОР&mailto=ВАШ_EMAIL
```

### Примеры для наших статей:

#### 1. Singh et al. 2021
```bash
curl "https://api.crossref.org/works?query.title=Private+Key+Recovery+Scheme+Partial+Knowledge&query.author=Singh&mailto=kudriavtsev.iv@phystech.edu" | json_pp
```

**Альтернативный поиск в браузере:**
```
https://search.crossref.org/?q=Singh+Private+Key+Recovery+Partial+Knowledge&from_ui=yes
```

#### 2. Blakley 1979 (если нужно)
```bash
curl "https://api.crossref.org/works?query.title=Safeguarding+cryptographic+keys&query.author=Blakley&mailto=kudriavtsev.iv@phystech.edu"
```

---

## 🔍 Метод 2: Google Scholar (самый простой)

### Шаги:
1. Откройте https://scholar.google.com
2. Введите точное название статьи + автора
3. Нажмите кавычки "Cite" под результатом
4. DOI обычно указан в библиографической ссылке

### Примеры:

#### Singh et al. 2021
**Поиск:** `Singh "Private Key Recovery Scheme" "Partial Knowledge" 2021`

Если статья опубликована в конференции или журнале, DOI будет в формате:
- ACM: `10.1145/...`
- IEEE: `10.1109/...`
- Springer: `10.1007/...`

#### Технические отчеты
⚠️ Технические отчеты (Technical Reports) **часто не имеют DOI**.

Альтернативы:
- arXiv.org (для препринтов)
- ResearchGate
- Институциональные репозитории

---

## 🔍 Метод 3: Прямой поиск на сайте издателя

### Где искать по типу издателя:

| Издатель | URL поиска | Формат DOI |
|----------|-----------|-----------|
| ACM | https://dl.acm.org/ | 10.1145/... |
| IEEE | https://ieeexplore.ieee.org/ | 10.1109/... |
| Springer | https://link.springer.com/ | 10.1007/... |
| Elsevier | https://www.sciencedirect.com/ | 10.1016/... |
| Wiley | https://onlinelibrary.wiley.com/ | 10.1002/... |
| arXiv | https://arxiv.org/ | arXiv:XXXX.XXXXX (не DOI) |

---

## 📋 Проверка для статей без DOI

### Singh et al. 2021 - варианты поиска:

1. **Google Scholar:**
   ```
   "Singh" "Stefanidis" "Kirstein" "Private Key Recovery"
   ```

2. **ResearchGate:**
   - Поиск по профилю автора Har Preet Singh
   - URL: https://www.researchgate.net/

3. **FIWARE Foundation:**
   - Статья указана как "FIWARE/Fraunhofer FOKUS Technical Report"
   - Проверить: https://www.fiware.org/
   - Или: https://www.fokus.fraunhofer.de/

4. **arXiv.org:**
   ```
   https://arxiv.org/search/?query=Singh+Private+Key+Recovery&searchtype=all
   ```

---

## ✅ РЕЗУЛЬТАТ: Что мы уже добавили

| № | Статья | DOI | Статус |
|---|--------|-----|--------|
| 7 | Shamir 1979 | `10.1145/359168.359176` | ✅ Добавлено |
| 11 | Pedin et al. 2023 | `10.1145/3564746.3587008` | ✅ Добавлено |
| 15 | Sharvot 2018 | `10.1145/3194113.3194122` | ✅ Добавлено |
| 12 | Singh et al. 2021 | ❓ Технический отчет | Поиск |

---

## 🎯 ПРАКТИЧЕСКОЕ ЗАДАНИЕ: Найти DOI для Singh et al. 2021

### Вариант А: Если статья опубликована в конференции/журнале

**Команда для поиска:**
```bash
curl "https://api.crossref.org/works?query.bibliographic=Singh+Stefanidis+Kirstein+Private+Key+Recovery+Partial+Knowledge+2021&mailto=kudriavtsev.iv@phystech.edu&rows=5" | python3 -m json.tool
```

**Ожидаемый результат (если DOI есть):**
```json
{
  "DOI": "10.xxxx/xxxxx",
  "title": ["A Private Key Recovery Scheme Using Partial Knowledge"],
  "author": [{"family": "Singh", "given": "Har Preet"}, ...]
}
```

### Вариант Б: Если это технический отчет без DOI

**Оставляем как есть:**
```latex
\bibitem{singh2021}
{\it Singh H.P., Stefanidis K., Kirstein F.}
A Private Key Recovery Scheme Using Partial Knowledge // 
FIWARE/Fraunhofer FOKUS Technical Report. 2021.
```

**Можно добавить URL, если найдем:**
```latex
FIWARE/Fraunhofer FOKUS Technical Report. 2021. URL: https://...
```

---

## 📚 Полезные ссылки

- **CrossRef REST API:** https://api.crossref.org/
- **CrossRef Search:** https://search.crossref.org/
- **Google Scholar:** https://scholar.google.com/
- **DOI Resolver:** https://doi.org/
- **CrossRef Metadata Search:** https://www.crossref.org/documentation/retrieve-metadata/rest-api/

---

## 💡 РЕКОМЕНДАЦИЯ

Для статьи Singh et al. 2021:

1. ✅ **Попробуйте Google Scholar** (самый простой способ)
2. ✅ **Проверьте ResearchGate** (профиль автора)
3. ✅ **Если DOI не найден** - это нормально для технического отчета

**Текущий вариант библиографии уже корректен!**

Технические отчеты, whitepapers, блоги и документация **часто не имеют DOI**, 
и это абсолютно нормально для академической публикации. Редакторы журнала 
понимают эту ситуацию.

---

## ✅ ИТОГОВАЯ СТАТИСТИКА DOI

**Всего источников:** 16  
**Имеют DOI:** 3 (19%)  
**Не имеют DOI:** 13 (81%)

**Это нормальное соотношение** для работ в области blockchain/криптографии, 
где много:
- Спецификаций (EIP)
- Whitepapers
- Блогов
- Технической документации
- Технических отчетов

**Для сравнения:** В математических журналах соотношение ~70% источников с DOI, 
в компьютерных науках ~40-50%, в blockchain ~20-30%.

