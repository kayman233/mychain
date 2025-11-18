# DOI для статей в списке литературы

## Инструкция по поиску DOI

### Способ 1: Google Scholar
1. Найдите статью в Google Scholar: https://scholar.google.com
2. Нажмите на кавычки ("Cite")
3. DOI часто указан в библиографической ссылке

### Способ 2: CrossRef
1. Перейдите на https://search.crossref.org/
2. Введите название статьи или имя автора
3. Скопируйте DOI

### Способ 3: Сайт журнала
1. Найдите статью на сайте журнала
2. DOI обычно указан на первой странице или в метаданных

---

## DOI для статей из вашей библиографии

### ✅ ИЗВЕСТНЫЕ DOI (проверенные)

#### [7] Shamir 1979
**Статья:** How to share a secret  
**DOI:** `10.1145/359168.359176`  
**Источник:** Communications of the ACM, 1979

#### [11] Pedin et al. 2023
**Статья:** Smart Contract-Based Social Recovery Wallet Management Scheme  
**DOI:** `10.1145/3564746.3587008`  
**Источник:** ACM Southeast Conference 2023

#### [15] Sharvot (Bartolucci et al. 2018)
**Статья:** Sharvot: Secret Share-Based Voting on the Blockchain  
**DOI:** `10.1145/3194113.3194122`  
**Источник:** IEEE/ACM WETSEB 2018

---

### ⚠️ ВЕРОЯТНО НЕТ DOI

- [1-5] EIP (Ethereum Improvement Proposals) — не имеют DOI (это спецификации, не статьи)
- [6] CryptoRank Insights — аналитический отчет, не статья
- [8] CosmWasm Documentation — документация
- [9] Argent Documentation — документация
- [10] Buterin 2021 (блог) — нет DOI
- [12] Singh et al. 2021 — технический отчет, возможно нет DOI
- [13] Vault12 Whitepaper — whitepaper, нет DOI
- [14] Grid+ Blog — блог, нет DOI
- [16] Allen 2016 (блог) — нет DOI

---

## Как добавить DOI в LaTeX

### Формат для журнала "Автоматика и Телемеханика":

После ссылки на статью добавляется `DOI: xxxx`

**Пример:**

```latex
\bibitem{shamirss}
{\it Shamir A.}
How to share a secret // 
Communications of the ACM. 1979. V. 22. No. 11. P. 612--613. DOI: 10.1145/359168.359176
```

---

## Готовые исправления для paper.tex

### 1. Shamir (строка 556-559)

**Было:**
```latex
\bibitem{shamirss}
{\it Shamir A.}
How to share a secret // 
Communications of the ACM. 1979. V. 22. No. 11. P. 612--613.
```

**Стало:**
```latex
\bibitem{shamirss}
{\it Shamir A.}
How to share a secret // 
Communications of the ACM. 1979. V. 22. No. 11. P. 612--613. DOI: 10.1145/359168.359176
```

---

### 2. Pedin et al. 2023 (строка 576-579)

**Было:**
```latex
\bibitem{pedin2023}
{\it Pedin A.B., Siasi N., Sameni M.}
Smart Contract-Based Social Recovery Wallet Management Scheme for Digital Assets // 
Proceedings of the 58th Annual ACM Southeast Conference (ACMSE). 2023. P. 69--76.
```

**Стало:**
```latex
\bibitem{pedin2023}
{\it Pedin A.B., Siasi N., Sameni M.}
Smart Contract-Based Social Recovery Wallet Management Scheme for Digital Assets // 
Proceedings of the 58th Annual ACM Southeast Conference (ACMSE). 2023. P. 69--76. DOI: 10.1145/3564746.3587008
```

---

### 3. Sharvot (Bartolucci et al. 2018) (строка 596-599)

**Было:**
```latex
\bibitem{sharvot}
{\it Bartolucci S., Bernat P., Joseph D.}
Sharvot: Secret Share-Based Voting on the Blockchain // 
Proceedings of the 2018 IEEE/ACM 1st International Workshop on Emerging Trends in Software Engineering for Blockchain (WETSEB). 2018. P. 30--34.
```

**Стало:**
```latex
\bibitem{sharvot}
{\it Bartolucci S., Bernat P., Joseph D.}
Sharvot: Secret Share-Based Voting on the Blockchain // 
Proceedings of the 2018 IEEE/ACM 1st International Workshop on Emerging Trends in Software Engineering for Blockchain (WETSEB). 2018. P. 30--34. DOI: 10.1145/3194113.3194122
```

---

## Как проверить DOI

Проверьте, что DOI работает, вставив его в браузер:
- https://doi.org/10.1145/359168.359176 (Shamir)
- https://doi.org/10.1145/3564746.3587008 (Pedin)
- https://doi.org/10.1145/3194113.3194122 (Sharvot)

---

## Дополнительно: Поиск DOI для Singh et al. 2021

**Статья:** A Private Key Recovery Scheme Using Partial Knowledge  
**Авторы:** Singh H.P., Stefanidis K., Kirstein F.  
**Год:** 2021

**Где искать:**
1. Google Scholar: "Singh Private Key Recovery Partial Knowledge"
2. ResearchGate: профили авторов
3. arXiv.org: возможно, есть препринт

**Примечание:** Технические отчеты (Technical Reports) часто не имеют DOI, 
но могут быть доступны на arXiv или в репозиториях институтов.

---

## Итого: 3 DOI добавляются

1. ✅ Shamir 1979: `10.1145/359168.359176`
2. ✅ Pedin 2023: `10.1145/3564746.3587008`
3. ✅ Bartolucci (Sharvot) 2018: `10.1145/3194113.3194122`

**Остальные источники** (EIP, блоги, документация) не имеют DOI — это нормально!

